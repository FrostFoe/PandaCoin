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
import { motion } from 'framer-motion';
import { generatePandaDetails, type PandaGeneratorOutput } from "@/ai/flows/panda-generator-flow";

interface RarityRevealModalProps {
  panda: Panda | null;
  isOpen: boolean;
  onClose: () => void;
}

const rarityInfo = {
    Common: {
        style: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        border: "border-gray-300 dark:border-gray-600",
    },
    Rare: {
        style: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        border: "border-blue-400 dark:border-blue-700",
    },
    "Ultra Rare": {
        style: "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 text-white",
        border: "border-purple-500",
    },
};

export function RarityRevealModal({ panda, isOpen, onClose }: RarityRevealModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [details, setDetails] = useState<PandaGeneratorOutput | null>(null);

  const generateBackstory = async () => {
    if (!panda) return;
    setIsGenerating(true);
    setDetails(null);
    try {
        const result = await generatePandaDetails({ rarity: panda.rarity });
        setDetails(result);
    } catch(e) {
        console.error("Failed to generate panda details", e);
        setDetails({
            name: panda.name || "Bloop",
            backstory: "This panda's story is currently lost in the bamboo forest. Try again!",
        });
    } finally {
        setIsGenerating(false);
    }
  };
  
  useEffect(() => {
    if (isOpen && panda && !panda.backstory) {
        generateBackstory();
    } else if (isOpen && panda && panda.backstory) {
        setDetails({ name: panda.name, backstory: panda.backstory });
    }
  }, [isOpen, panda]);

  const displayName = isGenerating ? <Skeleton className="h-8 w-48 mx-auto" /> : details?.name;
  const displayBackstory = isGenerating || !details ? (
    <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
    </div>
  ) : (
    <DialogDescription>{details.backstory}</DialogDescription>
  );

  if (!panda) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
          className={cn(
              "sm:max-w-md overflow-hidden p-0 border-4", 
              panda.rarity && rarityInfo[panda.rarity].border
          )}
        >
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
            }}
        >
            <DialogHeader className="p-6 pb-2 items-center">
                <div className="relative">
                    {panda.rarity === 'Ultra Rare' && (
                       [...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.2, repeat: Infinity, repeatType: "mirror" }}
                          className="absolute -inset-2"
                        >
                          <Sparkles className="h-full w-full text-accent opacity-50" />
                        </motion.div>
                      ))
                    )}
                    <motion.div
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Image
                            src={panda.imageUrl}
                            alt={details?.name || 'A cute panda'}
                            width={150}
                            height={150}
                            className="rounded-full border-4 border-accent shadow-lg bg-secondary"
                            data-ai-hint="panda cute"
                        />
                    </motion.div>
                </div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <DialogTitle className="text-center text-3xl font-headline mt-4">
                        {displayName}
                    </DialogTitle>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}>
                    <Badge className={cn("text-md mt-2", rarityInfo[panda.rarity].style)}>
                      {panda.rarity}
                    </Badge>
                </motion.div>
            </DialogHeader>
            <motion.div 
                className="p-6 pt-2 space-y-4"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
                <h4 className="font-bold flex items-center gap-2"><Bot /> AI-Generated Backstory</h4>
                {displayBackstory}
            </motion.div>
            <DialogFooter className="p-6 pt-2 sm:justify-between gap-2 bg-secondary/30 dark:bg-secondary/10">
                <Button onClick={generateBackstory} variant="outline" disabled={isGenerating}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Regenerating..." : "Regenerate"}
                </Button>
                <Button onClick={onClose}>Awesome!</Button>
            </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
