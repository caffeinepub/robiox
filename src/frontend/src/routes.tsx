import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AvatarPage from "@/pages/Avatar";
import GameDetail from "@/pages/GameDetail";
import Games from "@/pages/Games";
import Home from "@/pages/Home";
import PaymentFailure from "@/pages/PaymentFailure";
import PaymentSuccess from "@/pages/PaymentSuccess";
import Robux from "@/pages/Robux";
import Studio from "@/pages/Studio";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games",
  component: Games,
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) ?? "",
    genre: (search.genre as string) ?? "",
  }),
});

const gameDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games/$id",
  component: GameDetail,
});

const studioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/studio",
  component: Studio,
});

const avatarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/avatar",
  component: AvatarPage,
});

const robuxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/robux",
  component: Robux,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: PaymentSuccess,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: PaymentFailure,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  gamesRoute,
  gameDetailRoute,
  studioRoute,
  avatarRoute,
  robuxRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
]);

export type GamesSearch = {
  q: string;
  genre: string;
};

export { gamesRoute, gameDetailRoute };

export const _router = createRouter({ routeTree });
