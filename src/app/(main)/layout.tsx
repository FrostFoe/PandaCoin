"use client";

import { Header } from "@/components/layout/header";
import { GameProvider } from "@/context/GameContext";
import { BottomNav } from "@/components/layout/bottom-nav";
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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-secondary/30 pb-24 md:pb-8">
          <div className="container">
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
        <BottomNav />
      </div>
    </GameProvider>
  );
}
