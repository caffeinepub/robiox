import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-border bg-background/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Robiox</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  search={{ q: "", genre: "" }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  to="/studio"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Studio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/avatar"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Avatar
                </Link>
              </li>
              <li>
                <Link
                  to="/robux"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Buy Robux
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Genres</h4>
            <ul className="space-y-2">
              {["Adventure", "Roleplay", "Simulator", "Obby", "Fighting"].map(
                (g) => (
                  <li key={g}>
                    <Link
                      to="/games"
                      search={{ q: "", genre: g }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {g}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">About</h4>
            <p className="text-xs text-muted-foreground">
              Robiox is an online gaming platform where you can play, create,
              and share games with millions of players worldwide.
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Robiox. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Built with <Heart className="h-3 w-3 text-primary inline" /> using
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
