"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Trees, Trophy, Settings } from "lucide-react";
import { PandaIcon } from "../icons/panda-icon";
import { cn } from "@/lib/utils";
import { BambooCounter } from "../game/bamboo-counter";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/tame", label: "Tame", icon: Trees },
  { href: "/pandas", label: "Collection", icon: PandaIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background">
      <div className="flex items-center gap-2 h-16 border-b px-6">
        <PandaIcon className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-xl font-bold text-foreground">
          Bamboo Tame
        </h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary",
                isActive && "bg-secondary text-primary font-semibold",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 border-t">
        <BambooCounter />
      </div>
    </aside>
  );
}
