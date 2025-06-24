
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Panda } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface PandaCardProps {
  panda: Panda;
  onClick: () => void;
}

const rarityStyles = {
  Common: "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
  Rare: "bg-blue-200 text-blue-900 border-blue-400 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-600",
  "Ultra Rare":
    "bg-amber-400 text-amber-950 border-amber-500/80 shadow-md shadow-amber-500/50 animate-pulse",
};

export function PandaCard({ panda, onClick }: PandaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="cursor-pointer group"
      onClick={onClick}
      layoutId={`panda-card-${panda.id}`}
    >
      <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={panda.imageUrl || "https://placehold.co/400x400.png"}
            alt={`A cute panda named ${panda.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="panda eating bamboo"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold font-cutive-mono text-lg truncate">
              {panda.name}
            </h3>
            <Badge
              variant="outline"
              className={cn("font-bold border-2", rarityStyles[panda.rarity])}
            >
              {panda.rarity}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground h-10 line-clamp-2">
            {panda.backstory
              ? panda.backstory
              : "A mysterious new friend..."}
          </p>
          <div className="text-right text-xs text-muted-foreground mt-2">
              Tamed{" "}
              {formatDistanceToNow(new Date(panda.tamedAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
