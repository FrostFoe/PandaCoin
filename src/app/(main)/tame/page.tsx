"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RarityRevealModal } from '@/components/game/rarity-reveal-modal';
import { pandas, tasks } from '@/lib/data';
import type { Panda, Rarity } from '@/lib/types';
import { Leaf, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TAME_COST = 100;

function getRandomPanda(): Panda {
  const rand = Math.random() * 100;
  let rarity: Rarity;
  if (rand < 70) rarity = 'Common';
  else if (rand < 95) rarity = 'Rare';
  else rarity = 'Ultra Rare';

  const possiblePandas = pandas.filter(p => p.rarity === rarity);
  const randomPanda = possiblePandas[Math.floor(Math.random() * possiblePandas.length)] ?? pandas[0];

  return { ...randomPanda, id: new Date().toISOString(), tamedAt: new Date() };
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

    // playSound('tree-shake');
    setTimeout(() => {
      const newPanda = getRandomPanda();
      setTamedPanda(newPanda);
      setIsModalOpen(true);
      setIsTaming(false);
      // In a real app, save panda to user's collection
      if (newPanda.rarity === 'Ultra Rare') {
        // playSound('ultra-rare-jingle');
      } else {
        // playSound('tame-success');
      }
    }, 2000); // Simulate animation time
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTamedPanda(null);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center flex-1 gap-8">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080.png')] bg-cover bg-center opacity-10 dark:opacity-20" data-ai-hint="bamboo forest" />
      <div className="relative z-10 space-y-4 p-8 bg-background/80 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold font-headline">The Whispering Bamboo</h1>
        <p className="text-muted-foreground max-w-md">
          Spend your bamboo to rustle the leaves and see if a new friend comes out to play. Who will you meet today?
        </p>
        
        <div className="flex justify-center items-center">
            {/* Taming animation can go here */}
            <div className={`text-8xl transition-transform duration-500 ${isTaming ? 'animate-bounce' : ''}`}>
                🌳
            </div>
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

      <RarityRevealModal panda={tamedPanda} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
