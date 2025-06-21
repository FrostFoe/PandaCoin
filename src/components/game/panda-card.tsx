import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Panda } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface PandaCardProps {
  panda: Panda;
  onClick: () => void;
}

const rarityStyles = {
    "Common": "border-transparent bg-secondary/50 text-secondary-foreground",
    "Rare": "border-blue-500/30 bg-blue-500/10 text-blue-500 dark:text-blue-400",
    "Ultra Rare": "border-accent/30 bg-accent/10 text-amber-600 dark:text-accent",
}

export function PandaCard({ panda, onClick }: PandaCardProps) {
  return (
    <motion.div
        whileHover={{ y: -5, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Card className="overflow-hidden cursor-pointer h-full flex flex-col group border-2" onClick={onClick}>
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
            <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl font-code font-bold tracking-wider">{panda.name}</CardTitle>
                <Badge variant="outline" className={cn("text-xs font-bold whitespace-nowrap", rarityStyles[panda.rarity])}>{panda.rarity}</Badge>
            </div>
            <div className="flex-grow" />
            <p className="text-xs text-muted-foreground mt-2">Tamed {formatDistanceToNow(panda.tamedAt, { addSuffix: true })}</p>
        </CardContent>
        </Card>
    </motion.div>
  );
}
