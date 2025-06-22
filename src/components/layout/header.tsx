
"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { UserNav } from "./user-nav";
import { BambooCounter } from "../game/bamboo-counter";
import { ThemeToggle } from "./theme-toggle";
import { useGame } from "@/context/GameContext";

export function Header() {
  const { session, login } = useGame();
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <BambooCounter />
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        {session.status === "guest" ? (
          <Button onClick={login} variant="outline" size="sm">
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
