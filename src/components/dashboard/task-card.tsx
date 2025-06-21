"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/lib/types";
import { Leaf, CheckCircle2, Hourglass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGame } from "@/context/GameContext";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { toast } = useToast();
  const { claimTask, isTaskOnCooldown, getTaskCooldownTime, session } = useGame();
  
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
    if (session.status === 'loading' || onCooldown) return;
    
    claimTask(task);
    toast({
        title: "Task Claimed!",
        description: `You earned ${task.reward} bamboo!`,
    });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-lg font-bold text-primary">
          <Leaf className="h-5 w-5" />
          <span>+ {task.reward}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClaim} disabled={onCooldown || session.status === 'loading'}>
          {onCooldown ? (
            <div className="flex items-center gap-2">
                <Hourglass />
                <span>{formatTime(displayCooldown)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
                <CheckCircle2 />
                <span>Claim Reward</span>
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
