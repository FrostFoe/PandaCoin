"use client";

import Link from "next/link";
import { PandaIcon } from "../icons/panda-icon";
import { ClientNav } from "./client-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <PandaIcon className="h-8 w-8 text-primary" />
            <span className="font-bold font-fredoka text-lg hidden sm:inline-block">
              Bamboo Tame
            </span>
          </Link>
        </div>
        <ClientNav />
      </div>
    </header>
  );
}
