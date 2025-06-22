"use client";

import { GameProvider } from "@/context/GameContext";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GameProvider>
        <Header />
        <main>{children}</main>
        <Toaster />
      </GameProvider>
    </ThemeProvider>
  );
}
