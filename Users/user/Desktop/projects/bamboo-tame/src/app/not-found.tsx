import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/shared/PandaIcon";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-background">
      <PandaIcon className="w-28 h-28 md:w-32 md:h-32 text-primary/80" />
      <h1 className="mt-8 text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground font-fredoka">
        404 - Page Not Found
      </h1>
      <p className="text-base md:text-lg text-muted-foreground mt-2 mb-8 max-w-md">
        Oops! It looks like this page doesn't exist. Maybe you were looking for
        some delicious bamboo?
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard">Go to Homepage</Link>
      </Button>
    </div>
  );
}
