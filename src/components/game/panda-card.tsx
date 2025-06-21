import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Panda } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface PandaCardProps {
  panda: Panda;
  onClick: () => void;
}

const rarityStyles = {
    "Common": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    "Rare": "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200 animate-pulse",
    "Ultra Rare": "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 text-white animate-bounce",
}

export function PandaCard({ panda, onClick }: PandaCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300" onClick={onClick}>
      <CardHeader className="p-0">
        <div className="aspect-square relative">
            <Image 
                src={panda.imageUrl} 
                alt={panda.name} 
                fill 
                className="object-cover" 
                data-ai-hint="panda cute"
            />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-headline">{panda.name}</CardTitle>
            <Badge className={cn("text-xs", rarityStyles[panda.rarity])}>{panda.rarity}</Badge>
        </div>
        <p className="text-sm text-muted-foreground font-code font-bold tracking-widest">{`"${panda.name}"`}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xs text-muted-foreground">Tamed {formatDistanceToNow(panda.tamedAt, { addSuffix: true })}</p>
      </CardFooter>
    </Card>
  );
}
