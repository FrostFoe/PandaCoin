
"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { UserNav } from "./user-nav";
import { BambooCounter } from "../game/bamboo-counter";
import { ThemeToggle } from "./theme-toggle";
import { PandaIcon } from "../icons/panda-icon";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGame } from "@/context/GameContext";

export function Header() {
  const { session, login } = useGame();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex items-center gap-2 sm:gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 mr-auto"
          prefetch={false}
        >
          <PandaIcon className="h-8 w-8 text-primary" />
          <h1
            className={cn(
              "font-headline text-xl font-bold text-foreground whitespace-nowrap",
            )}
          >
            Bamboo Tame
          </h1>
        </Link>
        <div className="hidden md:flex">
          <BambooCounter />
        </div>
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
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
