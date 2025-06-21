"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Task } from "@/lib/types";
import {
  Leaf,
  CheckCircle2,
  Hourglass,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGame } from "@/context/GameContext";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { toast } = useToast();
  const { claimTask, isTaskOnCooldown, getTaskCooldownTime, session } =
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
    if (session.status === "loading" || onCooldown) return;

    claimTask(task);
    toast({
      title: "Task Claimed!",
      description: `You earned ${task.reward} bamboo!`,
    });
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
    <Card className="w-80 shrink-0 flex flex-col hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex items-center gap-2 text-lg font-bold text-primary mt-4">
          <Leaf className="h-5 w-5" />
          <span>+ {task.reward} Bamboo</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleClaim}
          disabled={onCooldown || session.status === "loading"}
        >
          {onCooldown ? (
            <>
              <Hourglass className="mr-2" />
              <span>{formatTime(displayCooldown)}</span>
            </>
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
