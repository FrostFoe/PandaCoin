"use client";

import { TaskCard } from "@/components/dashboard/task-card";
import { tasks } from "@/lib/data";
import { useGame } from "@/context/GameContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { session } = useGame();

  if (session.status === 'loading') {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, Panda Tamer!</h1>
            <p className="text-muted-foreground">Here are your daily tasks. Complete them to earn more bamboo!</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    </div>
  );
}


function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <Skeleton className="h-9 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

function CardSkeleton() {
    return (
        <div className="flex flex-col space-y-3 p-6 border rounded-lg">
            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-4 w-4/5" />
            <div className="flex-grow" />
            <Skeleton className="h-5 w-1/3 pt-4" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}
