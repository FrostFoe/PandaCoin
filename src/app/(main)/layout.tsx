import { Sidebar } from "@/components/layout/sidebar";
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
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-8 lg:p-10 bg-background pb-24 md:pb-8">
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    </GameProvider>
  );
}
