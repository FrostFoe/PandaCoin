export type Rarity = "Common" | "Rare" | "Ultra Rare";

export type Panda = {
  id: string;
  name: string;
  rarity: Rarity;
  image_url: string;
  backstory?: string;
  tamed_at: Date | string;
};

export type Task = {
  id: string;
  name: string;
  description: string | null;
  reward: number;
  cooldown: number;
  created_at: string;
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
  tasks: Task[];
};
