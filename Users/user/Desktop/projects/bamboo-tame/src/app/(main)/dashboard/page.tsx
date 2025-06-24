"use client";

import { useState } from "react";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { useGame } from "@/context/GameProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { HorizontalScrollSection } from "@/components/shared/HorizontalScrollSection";
import { PandaCard } from "@/components/game/PandaCard";
import { RarityRevealModal } from "@/components/game/RarityRevealModal";
import type { Panda } from "@/lib/types";

export default function DashboardPage() {
  const { gameState, isLoading } = useGame();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPanda, setSelectedPanda] = useState<Panda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || !gameState) {
    return <DashboardSkeleton />;
  }

  const handlePandaClick = (panda: Panda) => {
    setSelectedPanda(panda);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPanda(null);
  };

  const { pandas, tasks } = gameState;

  const filteredPandas = pandas.filter(
    (panda) =>
      panda.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      panda.backstory?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container py-6 md:py-10 space-y-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for pandas, rarities, and more..."
          className="pl-12 rounded-full h-12 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <HorizontalScrollSection title="Daily Bamboo Bounties">
        {tasks.map((task) => (
          <div key={task.id} className="w-80 shrink-0">
            <TaskCard task={task} />
          </div>
        ))}
      </HorizontalScrollSection>

      <div>
        <h2 className="text-2xl font-bold font-fredoka mb-4">
          All Tamed Pandas
        </h2>
        {filteredPandas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPandas.map((panda) => (
              <PandaCard
                key={panda.id}
                panda={panda}
                onClick={() => handlePandaClick(panda)}
              />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-16 text-muted-foreground border-2 border-dashed rounded-xl">
            <h3 className="text-lg font-bold font-fredoka">No Pandas Found</h3>
            <p className="text-sm">
              Your search for "{searchQuery}" didn't return any results.
            </p>
          </div>
        )}
      </div>

      {selectedPanda && (
        <RarityRevealModal
          panda={selectedPanda}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container py-6 md:py-10 space-y-10">
      <Skeleton className="h-12 w-full rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-80 rounded-xl shrink-0" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
