
"use client";

import { TaskCard } from "@/components/dashboard/task-card";
import { tasks } from "@/lib/data";
import { useGame } from "@/context/GameContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { HorizontalScrollSection } from "@/components/dashboard/horizontal-scroll-section";
import { FavoritePandaCard } from "@/components/dashboard/favorite-panda-card";
import { PandaCard } from "@/components/game/panda-card";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { gameState, session } = useGame();

  if (session.status === "loading" || !gameState) {
    return <DashboardSkeleton />;
  }

  const { pandas } = gameState;
  const favoritePandas = pandas.slice(0, 5);
  const recentlyTamed = pandas
    .sort((a, b) => new Date(b.tamedAt).getTime() - new Date(a.tamedAt).getTime())
    .slice(0, 10);

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="px-4 md:px-0 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold font-headline"
        >
          Good Evening, Panda Tamer!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-2 text-base max-w-xl mx-auto"
        >
          What's for dinner? Find new pandas in your area.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mt-6 max-w-lg mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for pandas & stories..."
            className="pl-12 rounded-full h-11 md:h-12 text-base"
          />
        </motion.div>
      </div>

      <HorizontalScrollSection title="Your Daily Deals">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            className="w-[280px] shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </HorizontalScrollSection>

      {favoritePandas.length > 0 && (
        <HorizontalScrollSection title="Your Favorite Pandas">
          {favoritePandas.map((panda, i) => (
            <motion.div
              key={panda.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <FavoritePandaCard panda={panda} />
            </motion.div>
          ))}
          <Link
            href="/pandas"
            className="flex flex-col items-center justify-center gap-1 shrink-0 bg-secondary rounded-full h-20 w-20 text-muted-foreground hover:bg-secondary/80 transition-colors"
          >
            <div className="text-xs font-semibold">View All</div>
          </Link>
        </HorizontalScrollSection>
      )}

      {recentlyTamed.length > 0 && (
        <HorizontalScrollSection title="Recently Tamed">
          {recentlyTamed.map((panda, i) => (
            <motion.div
              key={panda.id}
              className="w-56 shrink-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              <PandaCard panda={panda} onClick={() => {}} />
            </motion.div>
          ))}
        </HorizontalScrollSection>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="px-4 md:px-0 text-center">
        <Skeleton className="h-10 w-3/4 mx-auto mb-3" />
        <Skeleton className="h-5 w-1/2 mx-auto" />
        <Skeleton className="h-12 w-full max-w-lg mx-auto mt-6 rounded-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 ml-4 md:ml-0" />
        <div className="flex space-x-4 px-4 md:px-0">
          <Skeleton className="h-48 w-[280px] rounded-xl shrink-0" />
          <Skeleton className="h-48 w-[280px] rounded-xl shrink-0" />
        </div>
      </div>
    </div>
  );
}
