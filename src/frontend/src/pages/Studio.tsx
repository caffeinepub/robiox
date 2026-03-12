import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { GAMES } from "@/data/games";
import { Code2, Folder, Gamepad2, Play, Plus, Save } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const DEFAULT_LUA = `-- Welcome to Robiox Studio!
-- Start building your game here

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Game settings
local MAX_PLAYERS = 10
local RESPAWN_TIME = 5

local function onPlayerAdded(player)
  print("Player joined: " .. player.Name)
  
  -- Setup character
  player.CharacterAdded:Connect(function(character)
    local humanoid = character:WaitForChild("Humanoid")
    humanoid.Died:Connect(function()
      wait(RESPAWN_TIME)
      player:LoadCharacter()
    end)
  end)
end

Players.PlayerAdded:Connect(onPlayerAdded)
print("Game loaded successfully!")
`;

const MY_GAMES = GAMES.slice(0, 3).map((g, i) => ({
  ...g,
  status: i === 0 ? "Public" : i === 1 ? "Private" : "In Review",
  lastUpdated: ["2 hours ago", "Yesterday", "3 days ago"][i],
}));

export default function Studio() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [code, setCode] = useState(DEFAULT_LUA);
  const [creating, setCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("my-games");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !genre) {
      toast.error("Please fill in the game title and genre.");
      return;
    }
    setCreating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setCreating(false);
    toast.success(`"${title}" has been created! Opening Studio...`);
    setTitle("");
    setDescription("");
    setGenre("");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Robiox Studio</h1>
            <p className="text-sm text-muted-foreground">
              Create and publish your games
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="my-games" data-ocid="studio.my_games.tab">
              <Folder className="h-4 w-4 mr-2" /> My Games
            </TabsTrigger>
            <TabsTrigger value="create" data-ocid="studio.create.tab">
              <Plus className="h-4 w-4 mr-2" /> Create
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-games">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MY_GAMES.map((game, i) => (
                <Card
                  key={game.id}
                  className="border-border hover:border-primary/40 transition-colors"
                  data-ocid={`studio.game.item.${i + 1}`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          game.status === "Public"
                            ? "border-green-500/50 text-green-400 bg-green-500/10"
                            : game.status === "Private"
                              ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                              : "border-blue-500/50 text-blue-400 bg-blue-500/10"
                        }`}
                      >
                        {game.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2 pt-3">
                    <CardTitle className="font-display text-base">
                      {game.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Updated {game.lastUpdated}
                    </p>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-xs"
                        data-ocid={`studio.edit.button.${i + 1}`}
                      >
                        <Code2 className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        data-ocid={`studio.play.button.${i + 1}`}
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <button
                type="button"
                className="border-2 border-dashed border-border hover:border-primary/40 rounded-lg min-h-[200px] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setActiveTab("create")}
                data-ocid="studio.new_game.button"
              >
                <Plus className="h-8 w-8" />
                <span className="text-sm font-medium">New Game</span>
              </button>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">
                  Game Details
                </h2>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="game-title">Game Title *</Label>
                    <Input
                      id="game-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="My Awesome Game"
                      data-ocid="studio.title.input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="game-description">Description</Label>
                    <Textarea
                      id="game-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your game..."
                      rows={4}
                      data-ocid="studio.description.textarea"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studio-genre">Genre *</Label>
                    <Select value={genre} onValueChange={setGenre}>
                      <SelectTrigger
                        id="studio-genre"
                        data-ocid="studio.genre.select"
                      >
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Adventure",
                          "Roleplay",
                          "Simulator",
                          "Obby",
                          "Fighting",
                          "Other",
                        ].map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={creating}
                    className="w-full bg-primary hover:bg-primary/90"
                    data-ocid="studio.create.submit_button"
                  >
                    {creating ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" /> Create Game
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold">
                    Script Editor
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      data-ocid="studio.save.button"
                    >
                      <Save className="h-3.5 w-3.5 mr-1" /> Save
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-500"
                      data-ocid="studio.run.button"
                    >
                      <Play className="h-3.5 w-3.5 mr-1" /> Run
                    </Button>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center gap-2">
                    <Gamepad2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-mono">
                      ServerScript.lua
                    </span>
                  </div>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm min-h-[320px] rounded-none border-0 bg-muted/20 resize-none focus-visible:ring-0 text-green-300"
                    spellCheck={false}
                    data-ocid="studio.code.editor"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
