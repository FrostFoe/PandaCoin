import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/shared/PandaIcon";
import { Gem, Award, Leaf, Trophy } from "lucide-react";
import * as React from "react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto h-20 flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <PandaIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-fredoka">Bamboo Tame</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          className="relative w-full py-20 md:py-32 lg:py-40 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://placehold.co/1920x800.png')",
          }}
          data-ai-hint="bamboo forest"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-fredoka">
              Tame, Collect, and Thrive
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your very own panda sanctuary awaits. Discover unique pandas,
              complete tasks, and climb the leaderboards!
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="h-14 px-8 text-lg">
                <Link href="/login">Start Your Adventure</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl font-bold font-fredoka">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your journey to becoming the ultimate panda tamer is simple and
                fun.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Leaf />}
                title="Tame New Pandas"
                description="Use bamboo to discover and collect a wide variety of unique pandas with AI-generated backstories."
              />
              <FeatureCard
                icon={<Trophy />}
                title="Climb the Leaderboard"
                description="Compete with other tamers to see who has the most impressive collection and bamboo balance."
              />
              <FeatureCard
                icon={<Gem />}
                title="Find Rare Breeds"
                description="Seek out Common, Rare, and Ultra Rare pandas, each with their own special charm."
              />
              <FeatureCard
                icon={<Award />}
                title="Complete Daily Tasks"
                description="Earn bamboo by completing fun daily bounties to fund your panda taming adventures."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/50">
        <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PandaIcon className="h-6 w-6 text-primary" />
            <p className="text-sm">
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
    <div className="p-6 text-center flex flex-col items-center">
      <div className="text-primary mb-4">
        {React.cloneElement(icon as React.ReactElement, {
          className: "h-12 w-12",
        })}
      </div>
      <h3 className="text-xl font-bold font-fredoka mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
