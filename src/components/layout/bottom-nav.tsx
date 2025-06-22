"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Trees, Trophy, Settings } from "lucide-react";
import { PandaIcon } from "../icons/panda-icon";
import { cn } from "@/lib/utils";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/tame", label: "Tame", icon: Trees },
  { href: "/pandas", label: "Collection", icon: PandaIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  const { session } = useGame();

  if (session.status === "loading") {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
      <nav className="flex justify-around items-center h-16">
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
                "flex flex-col items-center justify-center gap-1 w-full h-full text-muted-foreground transition-colors relative",
                isActive ? "text-primary" : "hover:text-primary",
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 transition-all",
                  isActive ? "h-7 w-7" : "h-6 w-6",
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-full"
                  layoutId="underline"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
