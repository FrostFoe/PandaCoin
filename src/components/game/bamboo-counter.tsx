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
      className="text-lg p-2 px-4 gap-2 border-2 border-primary/50 bg-primary/10 rounded-full h-12"
    >
      <Leaf className="h-6 w-6 text-primary" />
      <span className="font-bold text-primary">
        {gameState.bambooBalance.toLocaleString()}
      </span>
    </Badge>
  );
}
