"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  bambooBalance: number;
  setBambooBalance: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [bambooBalance, setBambooBalance] = useState(1234); // Initial mock balance

  return (
    <GameContext.Provider value={{ bambooBalance, setBambooBalance }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
