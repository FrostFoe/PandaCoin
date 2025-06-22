"use client";

import { Header } from "@/components/layout/header";
import { GameProvider } from "@/context/GameContext";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { PageTransition } from "@/components/layout/page-transition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
            <div className="container py-4 md:py-6">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
        </div>
        <BottomNav />
      </div>
    </GameProvider>
  );
}
