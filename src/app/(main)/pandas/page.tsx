"use client";

import { useState } from 'react';
import { PandaCard } from '@/components/game/panda-card';
import { RarityRevealModal } from '@/components/game/rarity-reveal-modal';
import type { Panda, Rarity } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PandaIcon } from '@/components/icons/panda-icon';
import { useGame } from '@/context/GameContext';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (session.status === 'loading' || !gameState) {
    return <CollectionSkeleton />;
  }
  
  const { pandas } = gameState;

  const filterPandas = (rarity: Rarity | 'All') => {
    if (rarity === 'All') {
      return pandas;
    }
    return pandas.filter(p => p.rarity === rarity);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Panda Collection</h1>
        <p className="text-muted-foreground">Behold, your army of fluffy chaos.</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({pandas.length})</TabsTrigger>
          {rarities.map(r => 
            <TabsTrigger key={r} value={r}>
                {r} ({filterPandas(r).length})
            </TabsTrigger>
          )}
        </TabsList>

        <AnimatePresence initial={false}>
            <TabsContent value="all" forceMount>
                {pandas.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                        {filterPandas('All').map(panda => <PandaCard key={panda.id} panda={panda} onClick={() => handlePandaClick(panda)} />)}
                    </div>
                ) : (
                    <div className="col-span-full text-center py-16 text-muted-foreground">
                        <PandaIcon className="h-16 w-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">The bamboo forest is quiet...</h3>
                        <p>Go to the 'Tame' page to find some new friends!</p>
                    </div>
                )}
            </TabsContent>
            {rarities.map(r => (
                <TabsContent key={r} value={r}>
                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                        {filterPandas(r).map(panda => <PandaCard key={panda.id} panda={panda} onClick={() => handlePandaClick(panda)} />)}
                    </div>
                </TabsContent>
            ))}
        </AnimatePresence>
      </Tabs>

      <RarityRevealModal panda={selectedPanda} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}


import { AnimatePresence } from 'framer-motion';

function CollectionSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <Skeleton className="h-9 w-1/2 mb-2" />
                <Skeleton className="h-5 w-1/3" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square">
                        <Skeleton className="w-full h-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
