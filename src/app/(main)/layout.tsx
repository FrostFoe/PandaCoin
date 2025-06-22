"use client";

import { Header } from "@/components/layout/header";
import { GameProvider } from "@/context/GameContext";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <GameProvider>
      <div className="flex h-screen bg-secondary/30">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
            <div className="container py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
        <BottomNav />
      </div>
    </GameProvider>
  );
}
