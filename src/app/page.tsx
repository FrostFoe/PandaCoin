import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/icons/panda-icon";
import { Leaf, Gem, Trophy, Gamepad2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto h-20 flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <PandaIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Bamboo Tame</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter">
              Collect Cute Pandas,
              <br />
              <span className="text-primary">Earn Bamboo.</span>
            </h1>
            <p className="mx-auto max-w-prose text-lg text-muted-foreground md:mx-0">
              Complete fun tasks, earn bamboo, and spend it to tame unique and
              adorable pandas. Each one has a different rarity and a special,
              AI-generated story. Your fluffy collection awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/signup">Start Your Adventure</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">Play as Guest</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative w-full max-w-sm">
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-accent rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/30 rounded-full blur-3xl opacity-50"></div>
              <Image
                src="https://placehold.co/600x600.png"
                alt="A group of cute, playful pandas"
                width={600}
                height={600}
                className="relative rounded-full shadow-2xl"
                data-ai-hint="cute panda illustration"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl font-headline font-bold">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting started is as easy as a panda tumble. Four simple steps
                to panda paradise.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Leaf />}
                title="Earn Bamboo"
                description="Complete simple daily tasks and challenges to fill your stash with precious bamboo."
              />
              <FeatureCard
                icon={<Gamepad2 />}
                title="Tame Pandas"
                description="Use your bamboo to tame new panda friends from the magical bamboo forest. Who will you meet?"
              />
              <FeatureCard
                icon={<Gem />}
                title="Discover Rarities"
                description="Pandas come in Common, Rare, and Ultra Rare rarities, each with unique, AI-generated backstories."
              />
              <FeatureCard
                icon={<Trophy />}
                title="Climb the Ranks"
                description="Show off your collection and bamboo balance on the global leaderboard. Aim for the top!"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto flex items-center justify-between h-24 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PandaIcon className="h-6 w-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Bamboo Tame. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-card p-6 text-center flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
      <CardHeader className="p-0">
        <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
          {React.cloneElement(icon as React.ReactElement, {
            className: "h-8 w-8",
          })}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <h3 className="text-xl font-headline font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
