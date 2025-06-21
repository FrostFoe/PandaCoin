export type Rarity = "Common" | "Rare" | "Ultra Rare";

export type Panda = {
  id: string;
  name: string;
  rarity: Rarity;
  imageUrl: string;
  backstory?: string;
  tamedAt: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  reward: number;
  cooldownHours: number;
};

export type UserTask = {
  taskId: string;
  lastClaimedAt: Date;
  cooldownActive: boolean;
};

export type LeaderboardUser = {
  rank: number;
  username: string;
  avatarUrl: string;
  bamboo: number;
  ultraRares: number;
  title: string;
};
