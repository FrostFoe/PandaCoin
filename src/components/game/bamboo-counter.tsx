"use client";

import { Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

export function BambooCounter() {
  const [balance, setBalance] = useState(1234);

  // Fake balance increase for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Badge variant="outline" className="text-lg p-2 px-4 gap-2 border-2 border-primary/50 bg-primary/10">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="font-bold text-primary">{balance.toLocaleString()}</span>
    </Badge>
  );
}
