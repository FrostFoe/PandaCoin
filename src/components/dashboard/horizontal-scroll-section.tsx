import React from "react";

interface HorizontalScrollSectionProps {
  title: string;
  children: React.ReactNode;
}

export function HorizontalScrollSection({
  title,
  children,
}: HorizontalScrollSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold font-headline px-4 md:px-0">
        {title}
      </h3>
      <div className="relative">
        <div className="flex space-x-6 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide">
          {children}
        </div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
      </div>
    </div>
  );
}
