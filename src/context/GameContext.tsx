"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import type { Panda, GameState, Task } from "@/lib/types";
import { tasks as allTasks } from "@/lib/data";
import type { PandaGeneratorOutput } from "@/ai/flows/panda-generator-flow";

const GUEST_STORAGE_KEY = "bambooTameGuestData";
const TAME_COST = 100;

interface GameContextType {
  gameState: GameState | null;
  session: { status: "loading" | "guest" | "authenticated" };
  claimTask: (task: Task) => void;
  addPanda: (panda: Panda) => void;
  updatePandaDetails: (pandaId: string, details: PandaGeneratorOutput) => void;
  isTaskOnCooldown: (taskId: string) => boolean;
  getTaskCooldownTime: (taskId: string) => number;
  logout: () => void;
  login: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [session, setSession] = useState<{
    status: "loading" | "guest" | "authenticated";
  }>({ status: "loading" });
  const router = useRouter();

  useEffect(() => {
    try {
      const guestDataString = window.localStorage.getItem(GUEST_STORAGE_KEY);
      if (guestDataString) {
        const guestData = JSON.parse(guestDataString);
        guestData.pandas = guestData.pandas.map((p: Panda) => ({
          ...p,
          tamedAt: new Date(p.tamedAt),
        }));
        setGameState(guestData);
      } else {
        setGameState({
          bambooBalance: 500,
          pandas: [],
          userTasks: {},
        });
      }
    } catch (error) {
      console.error(
        "Failed to load guest data, initializing fresh state.",
        error,
      );
      setGameState({
        bambooBalance: 500,
        pandas: [],
        userTasks: {},
      });
    } finally {
      setSession({ status: "guest" });
    }
  }, []);

  useEffect(() => {
    if (session.status === "guest" && gameState) {
      try {
        window.localStorage.setItem(
          GUEST_STORAGE_KEY,
          JSON.stringify(gameState),
        );
      } catch (error) {
        console.error("Failed to save guest data.", error);
      }
    }
  }, [gameState, session.status]);

  const claimTask = useCallback(
    (task: Task) => {
      if (!gameState) return;

      const now = new Date();
      setGameState((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          bambooBalance: prevState.bambooBalance + task.reward,
          userTasks: {
            ...prevState.userTasks,
            [task.id]: { lastClaimedAt: now.toISOString() },
          },
        };
      });
    },
    [gameState],
  );

  const addPanda = useCallback((panda: Panda) => {
    setGameState((prevState) => {
      if (!prevState || prevState.bambooBalance < TAME_COST) return prevState;
      return {
        ...prevState,
        bambooBalance: prevState.bambooBalance - TAME_COST,
        pandas: [...prevState.pandas, panda],
      };
    });
  }, []);

  const updatePandaDetails = useCallback(
    (pandaId: string, details: PandaGeneratorOutput) => {
      setGameState((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          pandas: prevState.pandas.map((p) =>
            p.id === pandaId
              ? { ...p, name: details.name, backstory: details.backstory }
              : p,
          ),
        };
      });
    },
    [],
  );

  const getTaskCooldownTime = useCallback(
    (taskId: string): number => {
      if (!gameState) return 0;
      const taskState = gameState.userTasks[taskId];
      const taskInfo = allTasks.find((t) => t.id === taskId);
      if (!taskState || !taskInfo) return 0;

      const now = new Date().getTime();
      const lastClaimed = new Date(taskState.lastClaimedAt).getTime();
      const cooldownMillis = taskInfo.cooldownHours * 60 * 60 * 1000;

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

  const logout = () => {
    window.localStorage.removeItem(GUEST_STORAGE_KEY);
    setGameState({
      bambooBalance: 500,
      pandas: [],
      userTasks: {},
    });
    setSession({ status: "guest" });
    router.push("/");
  };

  const login = () => {
    router.push("/login");
  };

  const value = {
    gameState,
    session,
    claimTask,
    addPanda,
    updatePandaDetails,
    isTaskOnCooldown,
    getTaskCooldownTime,
    logout,
    login,
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
