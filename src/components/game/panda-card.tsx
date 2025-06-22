import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Panda } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface PandaCardProps {
  panda: Panda;
  onClick: () => void;
}

const rarityStyles = {
  Common: "bg-gray-100 text-gray-800",
  Rare: "bg-blue-100 text-blue-800",
  "Ultra Rare": "bg-primary/10 text-primary",
};

export function PandaCard({ panda, onClick }: PandaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="cursor-pointer group"
      onClick={onClick}
      layout
    >
      <div className="overflow-hidden rounded-lg">
        <div className="aspect-video relative">
          <Image
            src={panda.imageUrl}
            alt={`A cute panda named ${panda.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint="panda eating food"
          />
        </div>
      </div>
      <div className="py-3">
        <h3 className="font-bold text-lg truncate">{panda.name}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {panda.backstory
            ? panda.backstory.split(".").slice(0, 1).join(".") + "."
            : "A mysterious new friend..."}
        </p>
        <div className="flex items-center justify-between text-sm mt-2">
          <Badge className={cn("font-bold", rarityStyles[panda.rarity])}>
            {panda.rarity}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Tamed {formatDistanceToNow(new Date(panda.tamedAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
