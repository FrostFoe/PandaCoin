import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Panda } from "@/lib/types";

export function FavoritePandaCard({ panda }: { panda: Panda }) {
  return (
    <Link
      href="/pandas"
      className="flex flex-col items-center text-center gap-2 shrink-0 group"
    >
      <Avatar className="h-24 w-24 border-4 border-background shadow-md group-hover:border-primary transition-colors">
        <AvatarImage
          src={panda.imageUrl}
          alt={panda.name}
          data-ai-hint="panda cute"
        />
        <AvatarFallback>{panda.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <p className="font-semibold text-sm w-24 truncate">{panda.name}</p>
    </Link>
  );
}
