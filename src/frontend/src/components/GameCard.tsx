import { Badge } from "@/components/ui/badge";
import type { Game } from "@/data/games";
import { Link } from "@tanstack/react-router";
import { ThumbsUp, Users } from "lucide-react";
import { motion } from "motion/react";

const GENRE_COLORS: Record<string, string> = {
  Roleplay: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Adventure: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Simulator: "bg-green-500/20 text-green-300 border-green-500/30",
  Obby: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Fighting: "bg-red-500/20 text-red-300 border-red-500/30",
};

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
    >
      <Link to="/games/$id" params={{ id: game.id }} className="block group">
        <div className="rounded-lg overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-200 hover:shadow-glow-sm">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                  GENRE_COLORS[game.genre] ??
                  "bg-muted/20 text-muted-foreground"
                }`}
              >
                {game.genre}
              </span>
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white font-medium">
                {game.playing}
              </span>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {game.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {game.creator}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {game.playing}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ThumbsUp className="h-3 w-3" />
                {game.likes}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Suppress unused import warning
const _Badge = Badge;
void _Badge;
