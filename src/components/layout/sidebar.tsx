"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PandaIcon } from "@/components/icons/panda-icon";
import { LayoutGrid, Trees, Trophy, Settings as SettingsIcon, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { UserNav } from "./user-nav";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/tame", label: "Tame", icon: Trees },
  { href: "/pandas", label: "My Pandas", icon: PandaIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={cn(
        "relative hidden h-screen border-r bg-card p-4 transition-all duration-300 ease-in-out md:flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center gap-2 pb-4 border-b mb-4">
        <PandaIcon className="h-8 w-8 text-primary" />
        <h1
          className={cn(
            "font-headline text-2xl font-bold text-foreground whitespace-nowrap transition-opacity",
            isCollapsed && "opacity-0"
          )}
        >
          Bamboo Tame
        </h1>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-5 top-9 z-10 rounded-full bg-card border"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Button
              key={item.label}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                isCollapsed && "justify-center"
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                <span className={cn("whitespace-nowrap", isCollapsed && "hidden")}>
                  {item.label}
                </span>
              </Link>
            </Button>
          );
        })}
      </nav>
      
      <div className="mt-auto">
        <div className={cn("p-2", isCollapsed && "hidden")}>
          <UserNav />
        </div>
        <Button variant="ghost" className={cn("w-full justify-start gap-3", isCollapsed && "justify-center")}>
            <LogOut className="h-5 w-5" />
            <span className={cn(isCollapsed && "hidden")}>Logout</span>
        </Button>
      </div>
    </div>
  );
}
