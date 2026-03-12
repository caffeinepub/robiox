import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GAMES, GENRES } from "@/data/games";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Gamepad2, Search, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = GAMES.filter((g) => {
    const matchGenre = activeGenre === "All" || g.genre === activeGenre;
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate({ to: "/games", search: { q: search, genre: "" } });
    }
  };

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10 border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="/assets/generated/robiox-logo-icon.dim_200x200.png"
                alt="Robiox"
                className="h-16 w-16 rounded-xl shadow-glow"
              />
              <h1 className="font-display text-6xl md:text-8xl font-bold text-foreground">
                Robi<span className="text-primary">ox</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Play millions of games with friends. Create your own world. Share
              it with everyone.
            </p>

            <form
              onSubmit={handleSearchSubmit}
              className="flex gap-2 max-w-xl mx-auto mb-8"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search games..."
                  className="pl-10 bg-muted/50 border-border"
                  data-ocid="home.search_input"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                data-ocid="home.search.button"
              >
                Search
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-2">
              {GENRES.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  data-ocid="home.genre.tab"
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    activeGenre === genre
                      ? "bg-primary text-primary-foreground border-primary shadow-glow-sm"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Gamepad2, value: "8+", label: "Games" },
              { icon: Users, value: "500M+", label: "Players" },
              { icon: Star, value: "4.8", label: "Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-xl">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">
            {activeGenre === "All" ? "Featured Games" : activeGenre}
          </h2>
          <Link
            to="/games"
            search={{ q: "", genre: "" }}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            data-ocid="home.all_games.link"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="home.games.empty_state"
          >
            <Gamepad2 className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No games found for &quot;{search}&quot;</p>
          </div>
        )}
      </section>
    </main>
  );
}
