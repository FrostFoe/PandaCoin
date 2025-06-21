import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/icons/panda-icon";
import { Leaf, Gem, Trophy, Gamepad2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto h-16 flex items-center justify-between px-4">
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
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="flex-1 space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary border border-primary/20">
              The cutest panda game on the web!
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter">
              Tame Adorable Pandas.
            </h1>
            <p className="mx-auto max-w-prose text-lg text-muted-foreground md:mx-0">
              Complete fun tasks, earn bamboo, and spend it to tame unique and adorable pandas. Each one has a different rarity and a special, AI-generated story. Your fluffy collection awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/signup">Start Your Adventure</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                  <Link href="/login">Continue as Guest</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
                <PandaIcon className="w-64 h-64 md:w-80 md:h-80 text-primary drop-shadow-2xl animate-bounce" style={{animationDuration: '3s'}}/>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-2 mb-12">
                    <h2 className="text-3xl font-headline font-bold">How It Works</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Getting started is as easy as a panda tumble.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Leaf className="h-8 w-8 text-primary" />}
                        title="Earn Bamboo"
                        description="Complete simple daily tasks and challenges to fill your stash with precious bamboo."
                    />
                    <FeatureCard
                        icon={<Gamepad2 className="h-8 w-8 text-primary" />}
                        title="Tame Pandas"
                        description="Use your bamboo to tame new panda friends from the magical bamboo forest. Who will you meet?"
                    />
                    <FeatureCard
                        icon={<Gem className="h-8 w-8 text-primary" />}
                        title="Discover Rarities"
                        description="Pandas come in Common, Rare, and Ultra Rare rarities, each with unique, AI-generated backstories."
                    />
                    <FeatureCard
                        icon={<Trophy className="h-8 w-8 text-primary" />}
                        title="Climb the Ranks"
                        description="Show off your collection and bamboo balance on the global leaderboard. Aim for the top!"
                    />
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto flex items-center justify-between h-24 px-4">
            <div className="flex items-center gap-2">
                <PandaIcon className="h-6 w-6 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Bamboo Tame. All rights reserved.</p>
            </div>
            {/* Social links can go here */}
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="bg-card p-6 rounded-lg shadow-sm text-center flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-headline font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}
