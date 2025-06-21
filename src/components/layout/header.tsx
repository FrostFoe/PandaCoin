"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf, LayoutGrid, Trees, Trophy, Settings as SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { PandaIcon } from "../icons/panda-icon";
import { UserNav } from "./user-nav";
import { BambooCounter } from "../game/bamboo-counter";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/tame", label: "Tame", icon: Trees },
    { href: "/pandas", label: "My Pandas", icon: PandaIcon },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/settings", label: "Settings", icon: SettingsIcon },
  ];

export function Header() {
    const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <PandaIcon className="h-8 w-8 text-primary" />
                <span>Bamboo Tame</span>
              </Link>
              {navItems.map((item) => (
                 <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname.startsWith(item.href) ? 'text-primary bg-muted' : 'text-muted-foreground hover:text-primary'}`}
                >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {/* Search can go here if needed */}
        </div>
        <BambooCounter />
        <div className="hidden md:block">
            <UserNav />
        </div>
      </div>
    </header>
  );
}
