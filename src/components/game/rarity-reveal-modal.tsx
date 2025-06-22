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
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import {
  generatePandaDetails,
  type PandaGeneratorOutput,
} from "@/ai/flows/panda-generator-flow";

interface RarityRevealModalProps {
  panda: Panda | null;
  isOpen: boolean;
  onClose: () => void;
}

const rarityInfo = {
  Common: {
    style: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    border: "border-gray-300 dark:border-gray-600",
  },
  Rare: {
    style: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    border: "border-blue-400 dark:border-blue-700",
  },
  "Ultra Rare": {
    style:
      "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white",
    border: "border-pink-400",
  },
};

export function RarityRevealModal({
  panda,
  isOpen,
  onClose,
}: RarityRevealModalProps) {
  const { updatePandaDetails } = useGame();
  const [isGenerating, setIsGenerating] = useState(false);
  const [details, setDetails] = useState<PandaGeneratorOutput | null>(null);

  const generateBackstory = async () => {
    if (!panda) return;
    setIsGenerating(true);
    setDetails(null);
    try {
      const result = await generatePandaDetails({ rarity: panda.rarity });
      setDetails(result);
      updatePandaDetails(panda.id, result);
    } catch (e) {
      console.error("Failed to generate panda details", e);
      setDetails({
        name: panda.name || "Bloop",
        backstory:
          "This panda's story is currently lost in the bamboo forest. Try again!",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, panda]);

  const displayName = isGenerating ? (
    <Skeleton className="h-7 w-40 mx-auto" />
  ) : (
    details?.name
  );
  const displayBackstory =
    isGenerating || !details ? (
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
          "sm:max-w-sm overflow-hidden p-0 border-4",
          panda.rarity && rarityInfo[panda.rarity].border,
        )}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          <DialogHeader className="p-6 pb-2 items-center">
            <div className="relative">
              {panda.rarity === "Ultra Rare" &&
                [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.2,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    className="absolute -inset-2"
                  >
                    <Sparkles className="h-full w-full text-accent-foreground opacity-50" />
                  </motion.div>
                ))}
              <motion.div
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image
                  src={panda.imageUrl}
                  alt={details?.name || "A cute panda"}
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] rounded-full border-4 border-white dark:border-card shadow-lg bg-secondary"
                  data-ai-hint="panda cute"
                />
              </motion.div>
            </div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <DialogTitle className="text-center text-2xl font-headline mt-4">
                {displayName}
              </DialogTitle>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Badge
                className={cn(
                  "text-base mt-2 font-bold",
                  rarityInfo[panda.rarity].style,
                )}
              >
                {panda.rarity}
              </Badge>
            </motion.div>
          </DialogHeader>
          <motion.div
            className="p-6 pt-2 space-y-4 text-sm"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h4 className="font-bold flex items-center gap-2">
              <Bot /> AI-Generated Backstory
            </h4>
            {displayBackstory}
          </motion.div>
          <DialogFooter className="p-4 pt-2 sm:justify-between gap-2 bg-secondary/30 dark:bg-black/20">
            <Button
              onClick={generateBackstory}
              variant="outline"
              size="sm"
              disabled={isGenerating}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {isGenerating ? "Regenerating..." : "Regenerate"}
            </Button>
            <Button size="sm" onClick={onClose}>
              Awesome!
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
