"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Panda } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Sparkles, Bot, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameProvider";
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
    style: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    border: "border-gray-400 dark:border-gray-600",
  },
  Rare: {
    style: "bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
    border: "border-blue-500 dark:border-blue-700",
  },
  "Ultra Rare": {
    style: "bg-amber-400 text-amber-950",
    border: "border-amber-500",
    glow: "shadow-[0_0_20px_theme(colors.amber.400)]",
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
      await updatePandaDetails(panda.id, result);
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
  }, [isOpen, panda]);

  if (!panda) return null;

  const currentRarity = rarityInfo[panda.rarity];

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
      <DialogDescription className="text-center">
        {details.backstory}
      </DialogDescription>
    );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent
            className={cn(
              "sm:max-w-sm overflow-hidden p-0 border-4",
              currentRarity.border,
            )}
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
            >
              <DialogHeader className="p-6 pb-2 items-center bg-secondary/50">
                <div className={cn("relative", currentRarity.glow)}>
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
                        <Sparkles className="h-full w-full text-amber-400 opacity-50" />
                      </motion.div>
                    ))}
                  <motion.div
                    initial={{ scale: 0.5, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    <Image
                      src={panda.imageUrl || "https://placehold.co/400x400.png"}
                      alt={details?.name || "A cute panda"}
                      width={120}
                      height={120}
                      className={cn(
                        "w-[120px] h-[120px] rounded-full border-4 shadow-lg bg-secondary",
                        currentRarity.border,
                      )}
                      data-ai-hint="panda avatar"
                    />
                  </motion.div>
                </div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
                  }}
                >
                  <DialogTitle className="text-center text-2xl font-bold mt-4 font-cutive-mono">
                    {displayName}
                  </DialogTitle>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.5 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.4 },
                    },
                  }}
                >
                  <Badge
                    className={cn(
                      "text-sm mt-2 font-bold",
                      currentRarity.style,
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
                  visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
                }}
              >
                <h4 className="font-bold font-fredoka flex items-center gap-2 justify-center">
                  <Bot className="h-4 w-4" /> AI-Generated Backstory
                </h4>
                {displayBackstory}
              </motion.div>
              <DialogFooter className="p-4 pt-2 sm:justify-between gap-2 bg-secondary/50">
                <Button
                  onClick={generateBackstory}
                  variant="ghost"
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
        )}
      </AnimatePresence>
    </Dialog>
  );
}
