import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useRouterState } from "@tanstack/react-router";
import { Coins, LogIn, LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = loginStatus === "success" && identity;
  const isLoggingIn = loginStatus === "logging-in";
  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-3)}`
    : "";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/games", label: "Games" },
    { to: "/studio", label: "Studio" },
    { to: "/avatar", label: "Avatar" },
    { to: "/robux", label: "Robux" },
  ];

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/robiox-logo-icon.dim_200x200.png"
            alt="Robiox"
            className="h-8 w-8 rounded-sm"
          />
          <span className="font-display text-xl font-bold text-primary">
            Robiox
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/robux"
                className="flex items-center gap-1 text-sm font-medium text-yellow-400"
                data-ocid="nav.robux.link"
              >
                <Coins className="h-4 w-4" />
                <span>1,000 R$</span>
              </Link>
              <span className="text-sm text-muted-foreground">
                {shortPrincipal}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="nav.logout.button"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="hidden md:flex bg-primary hover:bg-primary/90"
              data-ocid="nav.login.button"
            >
              <LogIn className="h-3.5 w-3.5 mr-1" />
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </Button>
          )}

          <button
            type="button"
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile.toggle"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={clear}
                    data-ocid="nav.mobile.logout.button"
                  >
                    <LogOut className="h-3.5 w-3.5 mr-1" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full bg-primary"
                    onClick={login}
                    disabled={isLoggingIn}
                    data-ocid="nav.mobile.login.button"
                  >
                    <LogIn className="h-3.5 w-3.5 mr-1" />
                    {isLoggingIn ? "Signing in..." : "Sign In"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
