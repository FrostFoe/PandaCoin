import { Header } from "@/components/layout/header";
import { GameProvider } from "@/context/GameContext";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-secondary/30 pb-24 md:pb-8">
          <div className="container">{children}</div>
        </main>
        <BottomNav />
      </div>
    </GameProvider>
  );
}
