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
  Common: "bg-gray-200 text-gray-800 border-gray-300",
  Rare: "bg-blue-200/80 text-blue-900 border-blue-400",
  "Ultra Rare":
    "bg-amber-400/80 text-amber-950 border-amber-500 animate-pulse",
};

export function PandaCard({ panda, onClick }: PandaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="cursor-pointer group"
      onClick={onClick}
      layout
    >
      <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-card">
        <div className="aspect-video relative">
          <Image
            src={panda.imageUrl}
            alt={`A cute panda named ${panda.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint="panda eating bamboo"
          />
        </div>
        <div className="p-3">
          <h3 className="font-bold font-cutive-mono text-lg truncate">
            {panda.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate h-10">
            {panda.backstory
              ? panda.backstory
              : "A mysterious new friend..."}
          </p>
          <div className="flex items-center justify-between text-sm mt-2">
            <Badge
              variant="outline"
              className={cn("font-bold border", rarityStyles[panda.rarity])}
            >
              {panda.rarity}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Tamed{" "}
              {formatDistanceToNow(new Date(panda.tamedAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
