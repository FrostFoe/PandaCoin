"use client";

import { useState } from "react";
import { PandaCard } from "@/components/game/PandaCard";
import { RarityRevealModal } from "@/components/game/RarityRevealModal";
import type { Panda, Rarity } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/context/GameProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

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

        <AnimatePresence mode="wait">
          <motion.div
            key={pandas.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="all" className="mt-6">
              <PandaGrid
                pandas={filterPandas("All")}
                onPandaClick={handlePandaClick}
              />
            </TabsContent>

            {rarities.map((r) => (
              <TabsContent key={r} value={r} className="mt-6">
                <PandaGrid
                  pandas={filterPandas(r)}
                  onPandaClick={handlePandaClick}
                />
              </TabsContent>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs>

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

function PandaGrid({
  pandas,
  onPandaClick,
}: {
  pandas: Panda[];
  onPandaClick: (panda: Panda) => void;
}) {
  if (pandas.length === 0) {
    return (
      <div className="col-span-full text-center py-16 text-muted-foreground border-2 border-dashed rounded-xl">
        <h3 className="text-lg font-bold font-fredoka">No Pandas Here</h3>
        <p className="text-sm">Tame some new friends to see them here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pandas.map((panda) => (
        <PandaCard
          key={panda.id}
          panda={panda}
          onClick={() => onPandaClick(panda)}
        />
      ))}
    </div>
  );
}

function CollectionSkeleton() {
  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/2 mb-2 rounded-lg" />
        <Skeleton className="h-5 w-1/3 rounded-lg" />
      </div>
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
