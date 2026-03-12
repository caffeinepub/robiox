import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Coins, CreditCard, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface RobuxTier {
  id: string;
  amount: number;
  price: string;
  priceNum: number;
  bonus?: string;
  popular?: boolean;
}

const TIERS: RobuxTier[] = [
  { id: "100", amount: 100, price: "$1.99", priceNum: 1.99 },
  { id: "400", amount: 400, price: "$4.99", priceNum: 4.99 },
  { id: "800", amount: 800, price: "$9.99", priceNum: 9.99, popular: true },
  {
    id: "1700",
    amount: 1700,
    price: "$19.99",
    priceNum: 19.99,
    bonus: "+200 bonus",
  },
  {
    id: "4500",
    amount: 4500,
    price: "$49.99",
    priceNum: 49.99,
    bonus: "+500 bonus",
  },
];

export default function Robux() {
  const [selectedTier, setSelectedTier] = useState<RobuxTier | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBuy = (tier: RobuxTier) => {
    setSelectedTier(tier);
    setSuccess(false);
    setCheckoutOpen(true);
  };

  const handleCheckout = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setSuccess(true);
    toast.success(`${selectedTier?.amount} Robux added to your account!`);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
            <Coins className="h-8 w-8 text-yellow-400" />
          </div>
          <h1 className="font-display text-4xl font-bold mb-2">
            Buy <span className="text-yellow-400">Robux</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Robux is the virtual currency of Robiox. Use it to buy avatar
            accessories, game passes, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className={`relative rounded-xl border p-5 flex flex-col items-center gap-3 transition-all hover:shadow-glow-sm ${
                  tier.popular
                    ? "border-primary bg-primary/5 shadow-glow-sm"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <Coins className="h-6 w-6 text-yellow-400" />
                  <span className="font-display text-2xl font-bold text-yellow-400">
                    {tier.amount.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Robux</span>
                {tier.bonus && (
                  <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                    {tier.bonus}
                  </span>
                )}
                <div className="mt-1">
                  <span className="font-bold text-xl">{tier.price}</span>
                </div>
                <Button
                  className={`w-full text-sm ${tier.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => handleBuy(tier)}
                  data-ocid={`robux.buy.button.${i + 1}`}
                >
                  Buy Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              title: "Secure Payments",
              desc: "All transactions are encrypted and secure",
            },
            {
              icon: Zap,
              title: "Instant Delivery",
              desc: "Robux added to your account immediately",
            },
            {
              icon: CreditCard,
              title: "Easy Checkout",
              desc: "Pay with any major credit or debit card",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-3 p-4 rounded-lg bg-card border border-border"
            >
              <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent data-ocid="robux.checkout.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {success ? "Purchase Complete! 🎉" : "Complete Purchase"}
            </DialogTitle>
            <DialogDescription>
              {success
                ? `${selectedTier?.amount} Robux have been added to your account.`
                : `You're purchasing ${selectedTier?.amount} Robux for ${selectedTier?.price}`}
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="py-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <Check className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-yellow-400">
                  {selectedTier?.amount} Robux
                </strong>{" "}
                added to your wallet!
              </p>
              <Button
                className="mt-4 w-full"
                onClick={() => setCheckoutOpen(false)}
                data-ocid="robux.checkout.close_button"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Robux</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Coins className="h-3.5 w-3.5 text-yellow-400" />
                    {selectedTier?.amount.toLocaleString()}
                  </span>
                </div>
                {selectedTier?.bonus && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bonus</span>
                    <span className="text-green-400 font-medium">
                      {selectedTier.bonus}
                    </span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span>{selectedTier?.price}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="card-number"
                    className="text-xs text-muted-foreground mb-1 block"
                  >
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3 py-2 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    data-ocid="robux.card_number.input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="card-expiry"
                      className="text-xs text-muted-foreground mb-1 block"
                    >
                      Expiry
                    </label>
                    <input
                      id="card-expiry"
                      placeholder="MM / YY"
                      className="w-full px-3 py-2 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      data-ocid="robux.expiry.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="card-cvc"
                      className="text-xs text-muted-foreground mb-1 block"
                    >
                      CVC
                    </label>
                    <input
                      id="card-cvc"
                      placeholder="123"
                      className="w-full px-3 py-2 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      data-ocid="robux.cvc.input"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCheckoutOpen(false)}
                  data-ocid="robux.checkout.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={processing}
                  onClick={handleCheckout}
                  data-ocid="robux.checkout.confirm_button"
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⟳</span> Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Pay{" "}
                      {selectedTier?.price}
                    </span>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" /> Secured by 256-bit SSL encryption
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
