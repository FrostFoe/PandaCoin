"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Task } from "@/lib/types";
import { Leaf, CheckCircle2, Hourglass } from "lucide-react";
import { useGame } from "@/context/GameProvider";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { claimTask, isTaskOnCooldown, getTaskCooldownTime, isLoading } =
    useGame();

  const onCooldown = isTaskOnCooldown(task.id);
  const cooldownTime = getTaskCooldownTime(task.id);

  const [displayCooldown, setDisplayCooldown] = useState(cooldownTime);

  useEffect(() => {
    setDisplayCooldown(cooldownTime);
  }, [cooldownTime]);

  useEffect(() => {
    if (onCooldown && displayCooldown > 0) {
      const timer = setInterval(() => {
        setDisplayCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [onCooldown, displayCooldown]);

  const handleClaim = () => {
    if (isLoading || onCooldown) return;
    claimTask(task.id, task.reward);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <Card className="w-full h-full flex flex-col bg-card/80 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{task.name}</CardTitle>
          <div className="flex items-center gap-2 text-base font-bold text-yellow-600 dark:text-accent shrink-0">
            <Leaf className="h-5 w-5" />
            <span>+ {task.reward}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full rounded-full"
          onClick={handleClaim}
          disabled={onCooldown || isLoading}
        >
          {onCooldown ? (
            <div className="flex items-center gap-2">
              <Hourglass />
              <span className="font-mono text-sm">
                {formatTime(displayCooldown)}
              </span>
            </div>
          ) : (
            <>
              <CheckCircle2 className="mr-2" />
              <span>Claim Reward</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
