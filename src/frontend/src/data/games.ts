export interface Game {
  id: string;
  title: string;
  genre: string;
  playing: string;
  likes: string;
  creator: string;
  description: string;
  thumbnail: string;
  rating: number;
  visits: string;
  created: string;
}

export const GAMES: Game[] = [
  {
    id: "adopt-me",
    title: "Adopt Me!",
    genre: "Roleplay",
    playing: "89.2K",
    likes: "2.1M",
    creator: "Uplift Games",
    description:
      "Adopt Me! is the #1 most visited game on the platform! Adopt and raise cute pets, decorate your dream home, and play with friends in this vibrant roleplay world. Trade rare pets, complete quests, and discover new adventures every day!",
    thumbnail: "/assets/generated/game-adopt-me.dim_400x225.jpg",
    rating: 91,
    visits: "35.8B",
    created: "2017",
  },
  {
    id: "blox-fruits",
    title: "Blox Fruits",
    genre: "Adventure",
    playing: "124K",
    likes: "1.8M",
    creator: "go play blox fruits",
    description:
      "Become the most powerful fighter in this huge open world! Eat mystical Devil Fruits to gain incredible powers, master sword techniques, and fight your way to the top. Explore 3 seas and defeat powerful bosses across 20+ islands!",
    thumbnail: "/assets/generated/game-blox-fruits.dim_400x225.jpg",
    rating: 88,
    visits: "28.4B",
    created: "2019",
  },
  {
    id: "pet-simulator-x",
    title: "Pet Simulator X",
    genre: "Simulator",
    playing: "56.3K",
    likes: "890K",
    creator: "BIG Games",
    description:
      "Collect hundreds of unique pets, hatch eggs, and upgrade your pets to become the richest player! Mine coins, open treasure chests, and discover secret areas in this addictive incremental simulator. Can you collect all the legendary pets?",
    thumbnail: "/assets/generated/game-pet-simulator.dim_400x225.jpg",
    rating: 84,
    visits: "12.1B",
    created: "2021",
  },
  {
    id: "tower-of-hell",
    title: "Tower of Hell",
    genre: "Obby",
    playing: "43.1K",
    likes: "670K",
    creator: "YXCeptional Studios",
    description:
      "Race to the top of a randomly generated obstacle tower before time runs out! No checkpoints, pure skill. The tower changes every few minutes, keeping every attempt fresh and challenging. Compete with others to be the first to reach the top!",
    thumbnail: "/assets/generated/game-tower-of-hell.dim_400x225.jpg",
    rating: 87,
    visits: "18.7B",
    created: "2018",
  },
  {
    id: "brookhaven-rp",
    title: "Brookhaven RP",
    genre: "Roleplay",
    playing: "201K",
    likes: "3.2M",
    creator: "Wolfpaq",
    description:
      "Live your best life in Brookhaven! Drive cars, live in a house, explore the town, and roleplay with others. Start a family, get a job, host parties, or just hang out. The most popular social roleplay experience on the platform!",
    thumbnail: "/assets/generated/game-brookhaven.dim_400x225.jpg",
    rating: 89,
    visits: "42.3B",
    created: "2020",
  },
  {
    id: "murder-mystery-2",
    title: "Murder Mystery 2",
    genre: "Fighting",
    playing: "38.7K",
    likes: "450K",
    creator: "Nikilis",
    description:
      "Can you uncover the murderer before it's too late? Play as the Innocent, Sheriff, or Murderer in this suspenseful mystery game. Collect knives and guns, trade with friends, and survive to win. Over 100 unique weapons to collect!",
    thumbnail: "/assets/generated/game-murder-mystery.dim_400x225.jpg",
    rating: 85,
    visits: "8.9B",
    created: "2014",
  },
  {
    id: "arsenal",
    title: "Arsenal",
    genre: "Fighting",
    playing: "29.4K",
    likes: "340K",
    creator: "ROLVe Community",
    description:
      "The ultimate FPS experience on the platform! Arsenal is a fast-paced gun game where you cycle through 32 weapons to get a kill with each one. Be the first to get a kill with the golden knife to win. Features ranked mode and seasonal events!",
    thumbnail: "/assets/generated/game-arsenal.dim_400x225.jpg",
    rating: 82,
    visits: "5.7B",
    created: "2015",
  },
  {
    id: "natural-disaster-survival",
    title: "Natural Disaster Survival",
    genre: "Adventure",
    playing: "18.9K",
    likes: "280K",
    creator: "Stickmasterluke",
    description:
      "Survive earthquakes, floods, tornadoes, blizzards, and more! Each round takes place on a different map with a random natural disaster. Work together or fight alone to be the last one standing when the disaster strikes!",
    thumbnail: "/assets/generated/game-natural-disaster.dim_400x225.jpg",
    rating: 80,
    visits: "3.2B",
    created: "2011",
  },
];

export const GENRES = [
  "All",
  "Adventure",
  "Roleplay",
  "Simulator",
  "Obby",
  "Fighting",
];
