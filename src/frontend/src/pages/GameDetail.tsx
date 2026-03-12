import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GAMES } from "@/data/games";
import { gameDetailRoute } from "@/routes";
import { Link, useParams } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronLeft,
  Globe,
  Play,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function GameDetail() {
  const { id } = useParams({ from: gameDetailRoute.id });
  const game = GAMES.find((g) => g.id === id);
  const [playOpen, setPlayOpen] = useState(false);

  if (!game) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Game Not Found</h1>
        <p className="text-muted-foreground mb-6">
          This game doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/games" search={{ q: "", genre: "" }}>
            Browse Games
          </Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/games"
        search={{ q: "", genre: "" }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        data-ocid="game_detail.back.link"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Games
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative rounded-xl overflow-hidden mb-6 aspect-video max-h-80">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              {game.title}
            </h1>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-white border-white/40">
                {game.genre}
              </Badge>
              <span className="flex items-center gap-1 text-sm text-green-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {game.playing} playing
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-10 shadow-lg"
              onClick={() => setPlayOpen(true)}
              data-ocid="game_detail.play.button"
            >
              <Play className="h-5 w-5 mr-2 fill-white" /> Play
            </Button>

            <div>
              <h2 className="font-display text-lg font-semibold mb-2">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold mb-3">
                Ratings
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-5 w-5 ${
                        s <= Math.round(game.rating / 20)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-lg">{game.rating}%</span>
                <span className="text-sm text-muted-foreground">
                  positive ratings
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Game Info
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Creator:</span>
                  <span className="font-medium">{game.creator}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Playing:</span>
                  <span className="font-medium text-green-400">
                    {game.playing}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Likes:</span>
                  <span className="font-medium">{game.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Visits:</span>
                  <span className="font-medium">{game.visits}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{game.created}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={playOpen} onOpenChange={setPlayOpen}>
        <DialogContent data-ocid="game_detail.play.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Launching Robiox...
            </DialogTitle>
            <DialogDescription>
              This would launch <strong>{game.title}</strong> in the Robiox app.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
              <Play className="h-8 w-8 text-green-400 fill-green-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              In a full deployment, clicking Play would launch the Robiox client
              and connect you to <strong>{game.title}</strong> servers with up
              to {game.playing} concurrent players.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setPlayOpen(false)}
              data-ocid="game_detail.play.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-500"
              data-ocid="game_detail.play.confirm_button"
            >
              Open Robiox App
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
