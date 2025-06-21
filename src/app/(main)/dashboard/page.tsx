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

export default function DashboardPage() {
  const { gameState, session } = useGame();

  if (session.status === "loading" || !gameState) {
    return <DashboardSkeleton />;
  }

  const { pandas } = gameState;
  const favoritePandas = pandas.slice(0, 5);
  const recentlyTamed = pandas
    .sort((a, b) => new Date(b.tamedAt).getTime() - new Date(a.tamedAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="px-4 md:px-0">
        <h1 className="text-3xl font-bold font-headline">
          Good Evening, Panda Tamer!
        </h1>
        <p className="text-muted-foreground">
          What's for dinner? Find new pandas in your area.
        </p>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for pandas & stories..."
            className="pl-10 rounded-full h-12"
          />
        </div>
      </div>

      <HorizontalScrollSection title="Your Daily Deals">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </HorizontalScrollSection>

      {favoritePandas.length > 0 && (
        <HorizontalScrollSection title="Your Favorite Pandas">
          {favoritePandas.map((panda) => (
            <FavoritePandaCard key={panda.id} panda={panda} />
          ))}
          <Link
            href="/pandas"
            className="flex flex-col items-center justify-center gap-2 shrink-0 bg-secondary rounded-full h-24 w-24 text-muted-foreground hover:bg-secondary/80 transition-colors"
          >
            <div className="text-sm font-semibold">View All</div>
          </Link>
        </HorizontalScrollSection>
      )}

      {recentlyTamed.length > 0 && (
        <HorizontalScrollSection title="Recently Tamed">
          {recentlyTamed.map((panda) => (
            <div key={panda.id} className="w-64 shrink-0">
              <PandaCard panda={panda} onClick={() => {}} />
            </div>
          ))}
        </HorizontalScrollSection>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="px-4 md:px-0">
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-12 w-full mt-4 rounded-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-6">
          <Skeleton className="h-40 w-80 rounded-xl" />
          <Skeleton className="h-40 w-80 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
