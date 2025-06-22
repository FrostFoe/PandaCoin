"use client";

import { useState } from "react";
import { PandaCard } from "@/components/game/panda-card";
import { RarityRevealModal } from "@/components/game/rarity-reveal-modal";
import type { Panda, Rarity } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PandaIcon } from "@/components/icons/panda-icon";
import { useGame } from "@/context/GameContext";
import { Skeleton } from "@/components/ui/skeleton";

const rarities: Rarity[] = ["Common", "Rare", "Ultra Rare"];

export default function PandasPage() {
  const { gameState, session } = useGame();
  const [selectedPanda, setSelectedPanda] = useState<Panda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePandaClick = (panda: Panda) => {
    setSelectedPanda(panda);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPanda(null);
  };

  if (session.status === "loading" || !gameState) {
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
    <div className="flex flex-col gap-6 py-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">
          My Panda Collection
        </h1>
        <p className="text-muted-foreground text-base mt-1">
          Behold, your army of fluffy chaos.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="all">All ({pandas.length})</TabsTrigger>
          {rarities.map((r) => (
            <TabsTrigger key={r} value={r}>
              {r} ({filterPandas(r).length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {pandas.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filterPandas("All").map((panda) => (
                <PandaCard
                  key={panda.id}
                  panda={panda}
                  onClick={() => handlePandaClick(panda)}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
              <PandaIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-bold">
                The bamboo forest is quiet...
              </h3>
              <p className="text-sm">
                Go to the 'Tame' page to find some new friends!
              </p>
            </div>
          )}
        </TabsContent>

        {rarities.map((r) => (
          <TabsContent key={r} value={r} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
    <div className="flex flex-col gap-6 py-6">
      <div>
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="aspect-[3/4]">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
