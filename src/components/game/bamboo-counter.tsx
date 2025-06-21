"use client";

import { Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/context/GameContext';

export function BambooCounter() {
  const { bambooBalance } = useGame();
  
  return (
    <Badge variant="outline" className="text-lg p-2 px-4 gap-2 border-2 border-primary/50 bg-primary/10">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="font-bold text-primary">{bambooBalance.toLocaleString()}</span>
    </Badge>
  );
}
