"use client";

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { pandas as pandaTemplates } from '@/lib/data';
import type { Panda, Rarity } from '@/lib/types';
import { Leaf, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { Skeleton } from '@/components/ui/skeleton';

const TAME_COST = 100;

// Dynamically import the RarityRevealModal to code-split and reduce initial bundle size.
const RarityRevealModal = dynamic(
    () => import('@/components/game/rarity-reveal-modal').then(mod => mod.RarityRevealModal), 
    { 
        ssr: false,
        loading: () => (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                <div className="grid w-full max-w-md gap-4 rounded-lg border bg-background p-6 shadow-lg">
                    <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                    <Skeleton className="h-8 w-48 mx-auto" />
                    <Skeleton className="h-6 w-24 mx-auto" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        ),
    }
);


function getRandomPanda(): Panda {
  const rand = Math.random() * 100;
  let rarity: Rarity;
  if (rand < 70) rarity = 'Common';
  else if (rand < 95) rarity = 'Rare';
  else rarity = 'Ultra Rare';

  const possiblePandas = pandaTemplates.filter(p => p.rarity === rarity);
  const randomPandaTemplate = possiblePandas[Math.floor(Math.random() * possiblePandas.length)] ?? pandaTemplates[0];

  return { 
    ...randomPandaTemplate, 
    id: new Date().toISOString() + Math.random(), // Add random number for better uniqueness
    tamedAt: new Date(),
    name: "A new friend...", // Placeholder name
    backstory: undefined, // Explicitly undefined to trigger generation in modal
  };
}

export default function TamePage() {
  const [isTaming, setIsTaming] = useState(false);
  const [tamedPanda, setTamedPanda] = useState<Panda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { gameState, addPanda } = useGame();
  const { toast } = useToast();

  const handleTame = () => {
    if (!gameState || gameState.bambooBalance < TAME_COST) {
        toast({
            variant: "destructive",
            title: "Not enough bamboo!",
            description: `You need ${TAME_COST} bamboo to tame a panda.`,
        });
        return;
    }
    
    setIsTaming(true);
    
    // The balance deduction is now handled by the context's addPanda function
    const newPanda = getRandomPanda();
    addPanda(newPanda);

    setTimeout(() => {
      setTamedPanda(newPanda);
      setIsModalOpen(true);
      setIsTaming(false);
    }, 2000); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Add a delay to allow for exit animations
    setTimeout(() => setTamedPanda(null), 300);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center flex-1 gap-8">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080.png')] bg-cover bg-center opacity-10 dark:opacity-20" data-ai-hint="bamboo forest" />
      <div className="relative z-10 space-y-4 p-8 bg-background/80 rounded-lg shadow-xl">
        <motion.h1 
            className="text-4xl font-bold font-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            The Whispering Bamboo
        </motion.h1>
        <motion.p 
            className="text-muted-foreground max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
          Spend your bamboo to rustle the leaves and see if a new friend comes out to play. Who will you meet today?
        </motion.p>
        
        <div className="flex justify-center items-center h-64">
             <motion.div
                animate={{
                    rotate: isTaming ? [0, -2, 2, -2, 0] : 0,
                    scale: isTaming ? 1.05 : 1,
                }}
                transition={{ duration: 0.4, repeat: isTaming ? Infinity : 0, repeatType: "mirror" }}
                className="relative w-48 h-64"
            >
                <Image 
                    src="https://placehold.co/400x600.png"
                    alt="A magical bamboo tree, shaking with anticipation"
                    fill
                    className="object-contain"
                    data-ai-hint="bamboo tree"
                    priority
                />
            </motion.div>
        </div>

        <Button size="lg" onClick={handleTame} disabled={isTaming || !gameState}>
          {isTaming ? (
            "Shaking the bamboo..."
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>Tame Now</span>
              <div className="flex items-center gap-1 border-l pl-2 ml-2">
                <Leaf className="h-5 w-5" />
                <span>{TAME_COST}</span>
              </div>
            </div>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isModalOpen && tamedPanda && (
            <RarityRevealModal panda={tamedPanda} isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
