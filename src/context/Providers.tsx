"use client";

import { GameProvider } from "@/context/GameContext";
import { ThemeProvider } from "@/components/layout/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GameProvider>{children}</GameProvider>
    </ThemeProvider>
  );
}
