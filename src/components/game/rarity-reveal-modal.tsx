"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Panda } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Sparkles, Bot, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

interface RarityRevealModalProps {
  panda: Panda | null;
  isOpen: boolean;
  onClose: () => void;
}

const rarityStyles = {
    Common: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    Rare: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Ultra Rare": "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 text-white",
};

const rarityAnimations = {
    Common: "animate-in fade-in zoom-in-95",
    Rare: "animate-in fade-in zoom-in-95 duration-500",
    "Ultra Rare": "animate-in fade-in zoom-in-95 duration-1000",
};

export function RarityRevealModal({ panda, isOpen, onClose }: RarityRevealModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [backstory, setBackstory] = useState(panda?.backstory);

  useEffect(() => {
    if (panda && !panda.backstory) {
        generateBackstory();
    } else {
        setBackstory(panda?.backstory);
    }
  }, [panda]);

  const generateBackstory = async () => {
    if (!panda) return;
    setIsGenerating(true);
    // In a real app, you would call your AI flow here
    // const result = await pandaNameAndBackstoryFlow.run({ pandaName: panda.name, rarity: panda.rarity });
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    const generatedBackstory = `This is an AI generated backstory for ${panda.name}. It once ate a whole bamboo forest in a single afternoon, much to the surprise of local villagers who now refer to it as 'The Green Vacuum'.`;
    setBackstory(generatedBackstory);
    setIsGenerating(false);
  };

  if (!panda) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[425px]", rarityAnimations[panda.rarity])}>
        <DialogHeader>
          <div className="flex justify-center items-center relative">
            {panda.rarity === 'Ultra Rare' && (
                <Sparkles className="absolute h-24 w-24 text-yellow-400 animate-ping" />
            )}
            <Image
              src={panda.imageUrl}
              alt={panda.name}
              width={200}
              height={200}
              className="rounded-full border-4 border-accent shadow-lg"
              data-ai-hint="panda cute"
            />
          </div>
          <DialogTitle className="text-center text-3xl font-headline mt-4">
            You Tamed {panda.name}!
          </DialogTitle>
          <div className="flex justify-center">
            <Badge className={cn("text-md mt-2", rarityStyles[panda.rarity])}>
              {panda.rarity}
            </Badge>
          </div>
        </DialogHeader>
        <div className="py-4 space-y-4">
            <h4 className="font-bold flex items-center gap-2"><Bot /> Panda Backstory</h4>
            {isGenerating ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            ) : (
                <DialogDescription>{backstory}</DialogDescription>
            )}
        </div>
        <DialogFooter className="sm:justify-between gap-2">
            <Button onClick={generateBackstory} variant="outline" disabled={isGenerating}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating ? "Regenerating..." : "Regenerate Story"}
            </Button>
          <Button onClick={onClose}>Awesome!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
