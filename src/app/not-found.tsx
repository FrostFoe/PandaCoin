
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/icons/panda-icon";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-background">
      <PandaIcon
        className="w-28 h-28 md:w-32 md:h-32 text-primary/70 animate-bounce"
        style={{ animationDuration: "2s" }}
      />
      <h1 className="mt-8 text-4xl md:text-5xl font-extrabold font-headline tracking-tighter text-foreground">
        404
      </h1>
      <p className="text-base md:text-lg text-muted-foreground mt-2 mb-8 max-w-md">
        Oops! The bamboo forest is vast, and you seem to have taken a wrong
        turn.
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard">Return to the Path</Link>
      </Button>
    </div>
  );
}
