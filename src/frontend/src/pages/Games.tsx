import GameCard from "@/components/GameCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GAMES, GENRES } from "@/data/games";
import { gamesRoute } from "@/routes";
import { useSearch } from "@tanstack/react-router";
import { Gamepad2, Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Games() {
  const searchParams = useSearch({ from: gamesRoute.id });
  const [search, setSearch] = useState(searchParams.q ?? "");
  const [activeGenre, setActiveGenre] = useState(
    searchParams.genre && GENRES.includes(searchParams.genre)
      ? searchParams.genre
      : "All",
  );

  useEffect(() => {
    if (searchParams.q) setSearch(searchParams.q);
    if (searchParams.genre && GENRES.includes(searchParams.genre))
      setActiveGenre(searchParams.genre);
  }, [searchParams.q, searchParams.genre]);

  const filtered = GAMES.filter((g) => {
    const matchGenre = activeGenre === "All" || g.genre === activeGenre;
    const matchSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.creator.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-bold mb-2">Games</h1>
        <p className="text-muted-foreground mb-6">
          Discover and play from thousands of community-created games.
        </p>

        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games by name or creator..."
            className="pl-10"
            data-ocid="games.search_input"
          />
        </div>

        <Tabs
          value={activeGenre}
          onValueChange={setActiveGenre}
          className="mb-6"
        >
          <TabsList className="flex-wrap h-auto gap-1 bg-muted/30">
            {GENRES.map((genre) => (
              <TabsTrigger
                key={genre}
                value={genre}
                data-ocid="games.genre.tab"
              >
                {genre}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} game{filtered.length !== 1 ? "s" : ""} found
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="games.empty_state"
          >
            <Gamepad2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-medium mb-1">No games found</h3>
            <p className="text-sm">Try a different search or genre filter.</p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
