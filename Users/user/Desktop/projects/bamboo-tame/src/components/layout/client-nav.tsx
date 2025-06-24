
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tame", label: "Tame" },
  { href: "/pandas", label: "Collection" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export function ClientNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <UserNav />
      </div>
    </>
  );
}
