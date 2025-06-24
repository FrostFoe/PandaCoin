"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import type { Panda, GameState } from "@/lib/types";
import type { PandaGeneratorOutput } from "@/ai/flows/panda-generator-flow";
import { createClient } from "@/lib/supabase/client";
import {
  addPanda as addPandaAction,
  claimTask as claimTaskAction,
  getGameState,
  updatePandaDetails as updatePandaDetailsAction,
} from "@/actions/game";
import { useToast } from "@/lib/hooks/use-toast";

interface GameContextType {
  gameState: GameState | null;
  isLoading: boolean;
  addPanda: (panda: Omit<Panda, "id" | "tamedAt">) => Promise<Panda | null>;
  claimTask: (taskId: string, reward: number) => Promise<void>;
  updatePandaDetails: (
    pandaId: string,
    details: PandaGeneratorOutput,
  ) => Promise<void>;
  isTaskOnCooldown: (taskId: string) => boolean;
  getTaskCooldownTime: (taskId: string) => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchState = useCallback(async () => {
    try {
      const state = await getGameState();
      setGameState(state);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load game data. Please try refreshing.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    setIsLoading(true);
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        fetchState();
      }
      if (event === "SIGNED_OUT") {
        setGameState(null);
      }
    });

    fetchState();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchState]);

  const addPanda = useCallback(
    async (panda: Omit<Panda, "id" | "tamedAt">) => {
      const result = await addPandaAction(panda);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Taming Failed",
          description: result.error,
        });
        return null;
      }
      if (result.newPanda) {
        await fetchState();
        return result.newPanda;
      }
      return null;
    },
    [fetchState, toast],
  );

  const claimTask = useCallback(
    async (taskId: string, reward: number) => {
      const result = await claimTaskAction(taskId, reward);
      if (result.error) {
        toast({ variant: "destructive", title: result.error });
      } else {
        toast({
          title: "Task Claimed!",
          description: `You earned ${reward} bamboo!`,
        });
        await fetchState();
      }
    },
    [fetchState, toast],
  );

  const updatePandaDetails = useCallback(
    async (pandaId: string, details: PandaGeneratorOutput) => {
      const result = await updatePandaDetailsAction(pandaId, details);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: result.error,
        });
      } else {
        await fetchState();
      }
    },
    [fetchState, toast],
  );

  const getTaskCooldownTime = useCallback(
    (taskId: string): number => {
      if (!gameState) return 0;
      const taskState = gameState.userTasks.find((ut) => ut.task_id === taskId);
      const taskInfo = gameState.tasks.find((t) => t.id === taskId);
      if (!taskState || !taskInfo) return 0;

      const now = new Date().getTime();
      const lastClaimed = new Date(taskState.last_claimed_at).getTime();
      const cooldownMillis = taskInfo.cooldown * 60 * 60 * 1000;

      const timePassed = now - lastClaimed;
      if (timePassed >= cooldownMillis) {
        return 0;
      }

      return Math.round((cooldownMillis - timePassed) / 1000);
    },
    [gameState],
  );

  const isTaskOnCooldown = useCallback(
    (taskId: string): boolean => {
      return getTaskCooldownTime(taskId) > 0;
    },
    [getTaskCooldownTime],
  );

  const value = {
    gameState,
    isLoading,
    addPanda,
    claimTask,
    updatePandaDetails,
    isTaskOnCooldown,
    getTaskCooldownTime,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
