"use client";

import { Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGame } from "@/context/GameContext";
import { Skeleton } from "../ui/skeleton";

export function BambooCounter() {
  const { gameState, session } = useGame();

  if (session.status === "loading" || !gameState) {
    return <Skeleton className="h-10 w-28 rounded-full" />;
  }

  return (
    <Badge
      variant="outline"
      className="text-base p-2 px-3 gap-2 border-2 border-primary/50 bg-primary/10 rounded-full h-10"
    >
      <Leaf className="h-5 w-5 text-primary" />
      <span className="font-bold text-primary">
        {gameState.bambooBalance.toLocaleString()}
      </span>
    </Badge>
  );
}
