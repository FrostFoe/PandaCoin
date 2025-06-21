import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Common:
    "border-transparent bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Rare: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Ultra Rare":
    "border-transparent bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
};

export function PandaCard({ panda, onClick }: PandaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      layout
    >
      <Card
        className="overflow-hidden cursor-pointer h-full flex flex-col group shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300"
        onClick={onClick}
      >
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={panda.imageUrl}
              alt={`A cute panda named ${panda.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint="panda cute"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-bold whitespace-nowrap self-start",
              rarityStyles[panda.rarity],
            )}
          >
            {panda.rarity}
          </Badge>
          <CardTitle className="text-xl font-code font-bold tracking-wider mt-2">
            {panda.name}
          </CardTitle>

          <div className="flex-grow" />
          <p className="text-xs text-muted-foreground mt-2">
            Tamed{" "}
            {formatDistanceToNow(new Date(panda.tamedAt), { addSuffix: true })}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
