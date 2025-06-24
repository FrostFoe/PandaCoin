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
    <div>
      <h3 className="text-2xl font-bold font-fredoka px-4 md:px-0 mb-4">
        {title}
      </h3>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide">
          {children}
        </div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
