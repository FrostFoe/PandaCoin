"use client";

import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { BambooCounter } from "../game/bamboo-counter";
import { ThemeToggle } from "./theme-toggle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogIn } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <BambooCounter />
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        {isLoading ? (
          <Skeleton className="h-9 w-24 rounded-lg" />
        ) : !isAuthenticated ? (
          <LoginLink>
            <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </LoginLink>
        ) : (
          <UserNav />
        )}
      </div>
    </header>
  );
}
