"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import type { Panda, Rarity } from "@/lib/types";
import { Leaf, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Skeleton } from "@/components/ui/skeleton";

const TAME_COST = 100;

const RarityRevealModal = dynamic(
  () =>
    import("@/components/game/rarity-reveal-modal").then(
      (mod) => mod.RarityRevealModal,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="grid w-full max-w-sm gap-4 rounded-xl border bg-background p-6 shadow-lg">
          <Skeleton className="h-28 w-28 rounded-full mx-auto" />
          <Skeleton className="h-8 w-40 mx-auto" />
          <Skeleton className="h-6 w-20 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    ),
  },
);

function determineRarity(): Rarity {
  const rand = Math.random() * 100;
  if (rand < 70) return "Common";
  if (rand < 95) return "Rare";
  return "Ultra Rare";
}

export default function TamePage() {
  const [isTaming, setIsTaming] = useState(false);
  const [tamedPanda, setTamedPanda] = useState<Panda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { gameState, addPanda, isLoading } = useGame();
  const { toast } = useToast();

  const handleTame = async () => {
    if (!gameState || isLoading || isTaming) return;

    if (gameState.bambooBalance < TAME_COST) {
      toast({
        variant: "destructive",
        title: "Not enough bamboo!",
        description: `You need ${TAME_COST} bamboo to tame a panda.`,
      });
      return;
    }

    setIsTaming(true);

    const pandaTemplate = {
      rarity: determineRarity(),
      name: "A new friend...",
      imageUrl: "https://placehold.co/400x400.png",
      backstory: "",
    };

    const newPanda = await addPanda(pandaTemplate);

    setTimeout(() => {
      if (newPanda) {
        setTamedPanda(newPanda);
        setIsModalOpen(true);
      }
      setIsTaming(false);
    }, 1500); // Artificial delay to enjoy the animation
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setTamedPanda(null), 300);
  };

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 py-10 px-4 text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('https://placehold.co/1920x1080.png')] bg-cover bg-center opacity-10 dark:opacity-5 blur-sm"
        data-ai-hint="bamboo forest"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-6 p-6 md:p-8 bg-card/80 dark:bg-card/60 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
          Tame a New Panda
        </h1>
        <p className="text-muted-foreground">
          Spend your bamboo to discover a new panda. Who will you meet today?
        </p>

        <div className="flex justify-center items-center h-48 sm:h-56">
          <motion.div
            animate={{
              rotate: isTaming ? [0, -2, 2, -2, 0] : 0,
              scale: isTaming ? 1.05 : 1,
            }}
            transition={{
              duration: 0.3,
              repeat: isTaming ? Infinity : 0,
              repeatType: "mirror",
            }}
            className="relative w-36 h-48 sm:w-40 sm:h-56"
          >
            <Image
              src="https://placehold.co/400x600.png"
              alt="A shaking bamboo tree, rustling with anticipation"
              fill
              className="object-contain drop-shadow-xl"
              data-ai-hint="bamboo tree"
              priority
            />
          </motion.div>
        </div>

        <Button
          size="lg"
          onClick={handleTame}
          disabled={isTaming || isLoading || !gameState}
          className="w-full h-14 text-lg rounded-full shadow-lg"
        >
          {isTaming ? (
            "Searching..."
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles />
              <span>Tame Now</span>
              <div className="flex items-center gap-1 border-l-2 border-primary-foreground/50 pl-3 ml-2">
                <Leaf />
                <span>{TAME_COST}</span>
              </div>
            </div>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && tamedPanda && (
          <RarityRevealModal
            panda={tamedPanda}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
