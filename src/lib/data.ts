import type { Panda, Rarity, Task, LeaderboardUser } from './types';

export const tasks: Task[] = [
  {
    id: '1',
    title: '🌿 Touch Grass Challenge',
    description: 'Log in and prove you still know what the sun looks like.',
    reward: 10,
    cooldownHours: 24,
  },
  {
    id: '2',
    title: '🧠 Panda Trivia',
    description: 'Answer a question about our fluffy overlords. Did you know pandas have six "fingers"?',
    reward: 5,
    cooldownHours: 4,
  },
  {
    id: '3',
    title: '🖱️ Bamboo Clicker',
    description: 'Click the bamboo. A lot. For glory. And carpal tunnel.',
    reward: 20,
    cooldownHours: 6,
  },
  {
    id: '4',
    title: '📣 Share on X',
    description: 'Tell the world about your panda addiction. #BambooTame',
    reward: 50,
    cooldownHours: 48,
  },
];

export const pandas: Panda[] = [
  {
    id: '1',
    name: 'Sir Fluff',
    rarity: 'Common',
    imageUrl: 'https://placehold.co/400x400.png',
    tamedAt: new Date(Date.now() - 86400000 * 2),
    backstory: 'Sir Fluff once tried to roll uphill and discovered gravity the hard way. He now prefers a sedentary lifestyle of eating and judging your life choices.',
  },
  {
    id: '2',
    name: 'Bamboozled',
    rarity: 'Common',
    imageUrl: 'https://placehold.co/400x400.png',
    tamedAt: new Date(Date.now() - 86400000 * 5),
    backstory: 'Named for the perpetual look of confusion on his face, Bamboozled is either contemplating the secrets of the universe or trying to remember where he left his last bamboo stalk. It\'s probably the latter.',
  },
  {
    id: '3',
    name: 'Empress Wiggle',
    rarity: 'Rare',
    imageUrl: 'https://placehold.co/400x400.png',
    tamedAt: new Date(Date.now() - 86400000 * 10),
    backstory: 'Her Royal Wiggleness commands an army of dust bunnies. Her preferred method of travel is the majestic butt-scoot across a freshly cleaned floor.',
  },
  {
    id: '4',
    name: 'Captain Nom-Nom',
    rarity: 'Rare',
    imageUrl: 'https://placehold.co/400x400.png',
    tamedAt: new Date(Date.now() - 86400000 * 1),
    backstory: 'A fearless explorer of the culinary world, Captain Nom-Nom\'s greatest discovery to date is that bamboo tastes slightly different if you eat it upside down.',
  },
  {
    id: '5',
    name: 'Cosmic Floof',
    rarity: 'Ultra Rare',
    imageUrl: 'https://placehold.co/400x400.png',
    tamedAt: new Date(Date.now() - 86400000 * 30),
    backstory: 'Legend says Cosmic Floof wasn\'t born, but rather sneezed into existence by the universe itself. His fur contains tiny, sparkling galaxies, and he smells faintly of ozone and bamboo shoots.',
  },
  {
    id: '6',
    name: 'Lord Nibbleston',
    rarity: 'Common',
    imageUrl: 'https://placehold.co/400x400.png',
    tamedAt: new Date(Date.now() - 86400000 * 4),
    backstory: 'A panda of simple pleasures: a good nap, a crunchy bamboo stalk, and the quiet satisfaction of leaving paw prints on a clean window.',
  },
];

export const leaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    username: 'PandaProdigy',
    avatarUrl: 'https://placehold.co/100x100.png',
    bamboo: 98765,
    ultraRares: 12,
    title: 'Bamboo Baron',
  },
  {
    rank: 2,
    username: 'Bamboozler',
    avatarUrl: 'https://placehold.co/100x100.png',
    bamboo: 87654,
    ultraRares: 9,
    title: 'Stalk Market CEO',
  },
  {
    rank: 3,
    username: 'FluffyFanatic',
    avatarUrl: 'https://placehold.co/100x100.png',
    bamboo: 76543,
    ultraRares: 7,
    title: 'Rare Breed',
  },
  {
    rank: 4,
    username: 'SleepyScribe',
    avatarUrl: 'https://placehold.co/100x100.png',
    bamboo: 65432,
    ultraRares: 5,
    title: 'Nap Enthusiast',
  },
  {
    rank: 5,
    username: 'CosmicCuddler',
    avatarUrl: 'https://placehold.co/100x100.png',
    bamboo: 54321,
    ultraRares: 4,
    title: 'Galaxy Guardian',
  },
];
