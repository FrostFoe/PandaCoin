import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { GameProvider } from "@/context/GameContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-8 bg-secondary/30">
              {children}
          </main>
        </div>
      </div>
    </GameProvider>
  );
}
