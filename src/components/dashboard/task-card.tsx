"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Task } from "@/lib/types";
import { Leaf, CheckCircle2, Hourglass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { toast } = useToast();
  const { claimTask, isTaskOnCooldown, getTaskCooldownTime } = useGame();
  const { isLoading } = useKindeBrowserClient();

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
    <Card className="w-[270px] shrink-0 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-lg">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-xs text-muted-foreground">{task.description}</p>
        <div className="flex items-center gap-2 text-base font-bold text-green-500 mt-4">
          <Leaf className="h-4 w-4" />
          <span>+ {task.reward} Bamboo</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleClaim}
          disabled={onCooldown || isLoading}
        >
          {onCooldown ? (
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              >
                <Hourglass />
              </motion.div>
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
