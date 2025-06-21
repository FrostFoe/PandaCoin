"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task, UserTask } from "@/lib/types";
import { Leaf, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { toast } = useToast();
  const [cooldown, setCooldown] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = () => {
    // In a real app, this would be a server action
    setIsClaimed(true);
    setCooldown(task.cooldownHours * 3600); // in seconds
    toast({
        title: "Task Claimed!",
        description: `You earned ${task.reward} bamboo!`,
    });
    // playSound('claim-success');
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (isClaimed && cooldown <= 0) {
        setIsClaimed(false);
    }
  }, [cooldown, isClaimed]);

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
        <Button className="w-full" onClick={handleClaim} disabled={isClaimed}>
          {isClaimed ? (
            <span>Cooldown: {formatTime(cooldown)}</span>
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
