"use client";

import { useState } from "react";
import { PandaCard } from "@/components/game/panda-card";
import { RarityRevealModal } from "@/components/game/rarity-reveal-modal";
import type { Panda, Rarity } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/context/GameContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function PandasPage() {
  const { gameState, isLoading } = useGame();
  const [selectedPanda, setSelectedPanda] = useState<Panda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rarities: Rarity[] = ["Common", "Rare", "Ultra Rare"];

  const handlePandaClick = (panda: Panda) => {
    setSelectedPanda(panda);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPanda(null);
  };

  if (isLoading || !gameState) {
    return <CollectionSkeleton />;
  }

  const { pandas } = gameState;

  const filterPandas = (rarity: Rarity | "All") => {
    if (rarity === "All") {
      return pandas;
    }
    return pandas.filter((p) => p.rarity === rarity);
  };

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-fredoka">
          My Panda Collection
        </h1>
        <p className="text-muted-foreground text-base mt-1">
          Browse your collection of tamed pandas. Each one is unique!
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="all">All ({pandas.length})</TabsTrigger>
          {rarities.map((r) => (
            <TabsTrigger key={r} value={r}>
              {r} ({filterPandas(r).length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterPandas("All").map((panda) => (
              <PandaCard
                key={panda.id}
                panda={panda}
                onClick={() => handlePandaClick(panda)}
              />
            ))}
          </div>
        </TabsContent>

        {rarities.map((r) => (
          <TabsContent key={r} value={r} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterPandas(r).map((panda) => (
                <PandaCard
                  key={panda.id}
                  panda={panda}
                  onClick={() => handlePandaClick(panda)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <RarityRevealModal
        panda={selectedPanda}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

function CollectionSkeleton() {
  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/2 mb-2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4 mt-2" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
