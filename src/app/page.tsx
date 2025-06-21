import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/icons/panda-icon";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <PandaIcon className="h-8 w-8 text-primary" />
          <span className="sr-only">Bamboo Tame</span>
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
            Welcome to the bamboo forest!
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter">
            Bamboo Tame
          </h1>
          <PandaIcon className="h-24 w-24 mx-auto text-primary animate-bounce" />
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Complete tasks, earn bamboo, and tame adorable (and sometimes chaotic) pandas. Your fluffy collection awaits.
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-muted-foreground">© {new Date().getFullYear()} Bamboo Tame. All rights reserved.</p>
      </footer>
    </div>
  );
}
