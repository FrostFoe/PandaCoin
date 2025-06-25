"use client";

import { useGame } from "@/context/GameProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BambooCounter() {
  const { gameState, isLoading } = useGame();

  if (isLoading || !gameState) {
    return <Skeleton className="h-10 w-24 rounded-full" />;
  }

  return (
    <Badge
      variant="outline"
      className="h-10 px-4 text-base font-bold rounded-full border-2 border-primary/30 bg-primary/10"
    >
      <Leaf className="w-5 h-5 mr-2 text-primary" />
      <span className="text-primary">
        {gameState.bambooBalance.toLocaleString()}
      </span>
    </Badge>
  );
}
