"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PandaIcon } from "@/components/icons/panda-icon";
import {
  LayoutGrid,
  Trees,
  Trophy,
  Settings as SettingsIcon,
  LogOut,
  LogIn,
} from "lucide-react";
import { UserNav } from "./user-nav";
import { useGame } from "@/context/GameContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/tame", label: "Tame", icon: Trees },
  { href: "/pandas", label: "My Pandas", icon: PandaIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();
  const { session, logout, login } = useGame();

  return (
    <div
      className={cn(
        "relative hidden h-screen border-r bg-card p-4 md:flex flex-col w-[280px]",
      )}
    >
      <div className="flex items-center gap-4 px-2 pb-6 border-b mb-6">
        <PandaIcon className="h-10 w-10 text-primary" />
        <h1
          className={cn(
            "font-headline text-2xl font-bold text-foreground whitespace-nowrap",
          )}
        >
          Bamboo Tame
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Button
              key={item.label}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 text-base h-12"
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <Button
          asChild
          variant={pathname.startsWith("/settings") ? "secondary" : "ghost"}
          className="w-full justify-start gap-3 text-base h-12"
        >
          <Link href="/settings">
            <SettingsIcon className="h-5 w-5" />
            <span className="whitespace-nowrap">Settings</span>
          </Link>
        </Button>

        {session.status === "guest" ? (
          <Button
            onClick={login}
            variant="outline"
            className="w-full justify-start gap-3 text-base h-12"
          >
            <LogIn className="h-5 w-5" />
            <span>Login</span>
          </Button>
        ) : (
          <>
            <div className="p-2">
              <UserNav />
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start gap-3 text-base h-12"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
