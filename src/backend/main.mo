import AccessControl "./authorization/access-control";
import MixinAuthorization "./authorization/MixinAuthorization";
import Stripe "./stripe/stripe";
import OutCall "./http-outcalls/outcall";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Prim "mo:prim";

actor class Main() = this {

  // --- Authorization State ---
  let accessControlState = AccessControl.initState();

  // Include authorization mixin
  include MixinAuthorization(accessControlState);

  // --- Stripe config ---
  let stripeConfig : Stripe.StripeConfiguration = {
    secretKey = switch (Prim.envVar<system>("STRIPE_SECRET_KEY")) {
      case (?key) key;
      case (null) "";
    };
    allowedCountries = ["US", "GB", "CA", "AU"];
  };

  // --- Transform for HTTP outcalls ---
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --- User Profiles ---
  type UserProfile = {
    username : Text;
    robuxBalance : Nat;
    avatarData : Text;
  };

  let profiles = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func getProfile() : async ?UserProfile {
    profiles.get(caller);
  };

  public shared ({ caller }) func setUsername(username : Text) : async () {
    let existing = switch (profiles.get(caller)) {
      case (?p) p;
      case (null) { { username = ""; robuxBalance = 0; avatarData = "" } };
    };
    profiles.add(caller, { existing with username });
  };

  public shared ({ caller }) func setAvatarData(avatarData : Text) : async () {
    let existing = switch (profiles.get(caller)) {
      case (?p) p;
      case (null) { { username = ""; robuxBalance = 0; avatarData = "" } };
    };
    profiles.add(caller, { existing with avatarData });
  };

  public query ({ caller }) func getRobuxBalance() : async Nat {
    switch (profiles.get(caller)) {
      case (?p) p.robuxBalance;
      case (null) 0;
    };
  };

  // --- Games ---
  type Game = {
    id : Nat;
    title : Text;
    description : Text;
    genre : Text;
    creator : Principal;
    creatorName : Text;
    playerCount : Nat;
    isPublic : Bool;
  };

  var nextGameId : Nat = 1;
  let games = Map.empty<Nat, Game>();

  public shared ({ caller }) func createGame(title : Text, description : Text, genre : Text, creatorName : Text) : async Nat {
    let id = nextGameId;
    nextGameId += 1;
    games.add(id, {
      id;
      title;
      description;
      genre;
      creator = caller;
      creatorName;
      playerCount = 0;
      isPublic = true;
    });
    id;
  };

  public query func getPublicGames() : async [Game] {
    Array.fromIter(games.values()).filter(func(g : Game) : Bool { g.isPublic });
  };

  public query func searchGames(searchText : Text) : async [Game] {
    Array.fromIter(games.values()).filter(func(g : Game) : Bool {
      g.isPublic and (g.title.contains(#text searchText) or g.genre.contains(#text searchText));
    });
  };

  public query func getGame(gameId : Nat) : async ?Game {
    games.get(gameId);
  };

  public query ({ caller }) func getMyGames() : async [Game] {
    Array.fromIter(games.values()).filter(func(g : Game) : Bool { g.creator == caller });
  };

  // --- Robux Checkout via Stripe ---
  public shared ({ caller }) func createRobuxCheckout(robuxAmount : Nat, priceInCents : Nat, successUrl : Text, cancelUrl : Text) : async Text {
    let item : Stripe.ShoppingItem = {
      currency = "usd";
      productName = robuxAmount.toText() # " Robux";
      productDescription = "Robiox virtual currency";
      priceInCents;
      quantity = 1;
    };
    await Stripe.createCheckoutSession(stripeConfig, caller, [item], successUrl, cancelUrl, transform);
  };

  public shared func verifyRobuxPayment(sessionId : Text, payerPrincipal : Principal, robuxAmount : Nat) : async Bool {
    let status = await Stripe.getSessionStatus(stripeConfig, sessionId, transform);
    switch (status) {
      case (#completed({ userPrincipal = ?p })) {
        if (p == payerPrincipal.toText()) {
          let existing = switch (profiles.get(payerPrincipal)) {
            case (?pr) pr;
            case (null) { { username = ""; robuxBalance = 0; avatarData = "" } };
          };
          profiles.add(payerPrincipal, { existing with robuxBalance = existing.robuxBalance + robuxAmount });
          true;
        } else { false };
      };
      case (_) { false };
    };
  };
};
