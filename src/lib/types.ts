export type Rarity = "Common" | "Rare" | "Ultra Rare";

export type Panda = {
  id: string;
  name: string;
  rarity: Rarity;
  imageUrl: string;
  backstory?: string;
  tamedAt: Date | string; // Allow string for serialization
};

export type Task = {
  id: string;
  title: string;
  description: string;
  reward: number;
  cooldownHours: number;
};

// Represents the state of a single task for a user
export type UserTask = {
  lastClaimedAt: string; // ISO string
};

export type LeaderboardUser = {
  rank: number;
  username: string;
  avatarUrl: string;
  bamboo: number;
  ultraRares: number;
  title: string;
};

// Represents the entire game state for a user, suitable for localStorage
export type GameState = {
    bambooBalance: number;
    pandas: Panda[];
    userTasks: Record<string, UserTask>; // taskId -> UserTask
};
