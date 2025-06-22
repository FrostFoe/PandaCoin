import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/icons/panda-icon";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-background">
      <PandaIcon
        className="w-32 h-32 md:w-40 md:h-40 text-primary/70 animate-bounce"
        style={{ animationDuration: "2s" }}
      />
      <h1 className="mt-8 text-5xl md:text-6xl font-extrabold font-headline tracking-tighter text-foreground">
        404
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mt-2 mb-8 max-w-md">
        Oops! The bamboo forest is vast, and you seem to have taken a wrong
        turn.
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard">Return to the Path</Link>
      </Button>
    </div>
  );
}
