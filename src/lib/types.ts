export type Rarity = "Common" | "Rare" | "Ultra Rare";

export type Panda = {
  id: string;
  name: string;
  rarity: Rarity;
  imageUrl: string;
  backstory?: string;
  tamedAt: Date | string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  reward: number;
  cooldownHours: number;
};

export type UserTask = {
  task_id: string;
  last_claimed_at: string;
};

export type LeaderboardUser = {
  rank: number;
  username: string;
  avatarUrl: string;
  bamboo: number;
  ultraRares: number;
  title: string;
};

export type GameState = {
  bambooBalance: number;
  pandas: Panda[];
  userTasks: UserTask[];
};
