"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RarityRevealModal } from '@/components/game/rarity-reveal-modal';
import { pandas } from '@/lib/data';
import type { Panda, Rarity } from '@/lib/types';
import { Leaf, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

const TAME_COST = 100;

function getRandomPanda(): Panda {
  const rand = Math.random() * 100;
  let rarity: Rarity;
  if (rand < 70) rarity = 'Common';
  else if (rand < 95) rarity = 'Rare';
  else rarity = 'Ultra Rare';

  const possiblePandas = pandas.filter(p => p.rarity === rarity);
  const randomPandaTemplate = possiblePandas[Math.floor(Math.random() * possiblePandas.length)] ?? pandas[0];

  return { 
    ...randomPandaTemplate, 
    id: new Date().toISOString(), 
    tamedAt: new Date(),
    name: "A new friend...", // Placeholder name
    backstory: undefined, // Explicitly undefined to trigger generation in modal
  };
}

export default function TamePage() {
  const [isTaming, setIsTaming] = useState(false);
  const [tamedPanda, setTamedPanda] = useState<Panda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bambooBalance, setBambooBalance] = useState(1234);
  const { toast } = useToast();

  const handleTame = () => {
    if (bambooBalance < TAME_COST) {
        toast({
            variant: "destructive",
            title: "Not enough bamboo!",
            description: "Complete more tasks to afford taming a panda.",
        });
        return;
    }
    
    setIsTaming(true);
    setBambooBalance(prev => prev - TAME_COST);

    setTimeout(() => {
      const newPanda = getRandomPanda();
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
        
        <div className="flex justify-center items-center h-24">
            <motion.div
                animate={{
                    rotate: isTaming ? [0, -5, 5, -5, 0] : 0,
                    scale: isTaming ? 1.1 : 1,
                }}
                transition={{ duration: 0.5, repeat: isTaming ? Infinity : 0 }}
                className="text-8xl"
            >
                🌳
            </motion.div>
        </div>

        <Button size="lg" onClick={handleTame} disabled={isTaming}>
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
        {isModalOpen && (
            <RarityRevealModal panda={tamedPanda} isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
