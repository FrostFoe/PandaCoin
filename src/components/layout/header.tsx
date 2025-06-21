"use client";

import { Button } from "@/components/ui/button";
import {
  LogIn,
} from "lucide-react";
import { UserNav } from "./user-nav";
import { BambooCounter } from "../game/bamboo-counter";
import { useGame } from "@/context/GameContext";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const { session, login } = useGame();
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
       <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <BambooCounter />
        <ThemeToggle />
        {session.status === "guest" ? (
          <Button onClick={login} variant="outline">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        ) : (
          <UserNav />
        )}
      </div>
    </header>
  );
}
