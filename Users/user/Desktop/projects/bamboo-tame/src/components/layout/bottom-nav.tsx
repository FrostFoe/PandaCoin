"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Trees, Trophy } from "lucide-react";
import { PandaIcon } from "../icons/panda-icon";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/tame", label: "Tame", icon: Trees },
  { href: "/pandas", label: "Collection", icon: PandaIcon },
  { href: "/leaderboard", label: "Leaders", icon: Trophy },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-lg border-t z-50">
      <nav className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-muted-foreground w-full h-full transition-colors relative",
                isActive && "text-primary",
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-bold">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute bottom-1 w-8 h-1 bg-primary rounded-full"
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
