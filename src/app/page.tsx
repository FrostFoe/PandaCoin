"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/icons/panda-icon";
import { Leaf, Gem, Trophy, Gamepad2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto h-16 flex items-center justify-between px-4 md:px-6">
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
        <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
          <div className="flex-1 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-extrabold font-headline tracking-tighter"
            >
              Invest in Cuteness.
              <br />
              <span className="text-primary">Grow Your Fluffy Portfolio.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-prose text-base md:text-lg text-muted-foreground md:mx-0"
            >
              Welcome to the world's first Panda Stalk Market! Complete daily
              "Bamboo Bounties" to build your wealth, then invest in unique,
              AI-generated Fluffy Assets. Each panda is a unique entry in your
              portfolio, with rarities that define their market "aww"-ppeal.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/signup">Start Your Adventure</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">Play as Guest</Link>
              </Button>
            </motion.div>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full max-w-[300px] sm:max-w-xs">
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-accent rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse delay-500"></div>
              <Image
                src="https://placehold.co/600x600.png"
                alt="A group of cute pandas reviewing stock market charts"
                width={600}
                height={600}
                className="relative rounded-full shadow-2xl"
                data-ai-hint="panda stock market"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-3xl font-headline font-bold">
                Panda-nomics 101
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base">
                Your quick guide to succeeding in the bamboo economy.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Leaf />}
                title="Accumulate Capital"
                description="Complete 'Bamboo Bounties' and daily tasks. Your hustle builds your bamboo balance, the official currency of the panda economy."
              />
              <FeatureCard
                icon={<Gamepad2 />}
                title="Acquire Fluffy Assets"
                description="Diversify your portfolio by taming new pandas. Each one is a unique asset with its own hilarious, AI-generated backstory."
              />
              <FeatureCard
                icon={<Gem />}
                title="Analyze Market Trends"
                description="Pandas come in different rarities, from common cuddlers to ultra-rare legends. Rarity influences their 'cuteness index' and story!"
              />
              <FeatureCard
                icon={<Trophy />}
                title="Dominate the Stalk Market"
                description="Showcase your net worth and rare assets on the global Leaderboard. Compete to become the ultimate Panda Tycoon."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PandaIcon className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground text-xs">
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
    <Card className="bg-card p-5 text-center flex flex-col items-center shadow-lg hover:shadow-primary/10 transition-all duration-300 group border-2 border-transparent hover:border-primary/50">
      <CardHeader className="p-0">
        <div className="bg-primary/10 text-primary p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
          {React.cloneElement(icon as React.ReactElement, {
            className: "h-7 w-7",
          })}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <h3 className="text-lg font-headline font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
