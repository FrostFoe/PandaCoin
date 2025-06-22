"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PandaIcon } from "@/components/icons/panda-icon";
import { Gem, Search, UtensilsCrossed, Trophy } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto h-20 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PandaIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Panda Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <LoginLink>
              <Button variant="ghost">Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button>Sign up</Button>
            </RegisterLink>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          className="relative w-full py-20 md:py-32 lg:py-40 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://placehold.co/1920x800.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
              It's the food you love, delivered
            </h1>
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for pandas, dishes, or moods..."
                  className="h-14 w-full pl-5 pr-32 rounded-lg text-black"
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6">
                  <Search className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl font-bold">You tame, we deliver!</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get your favorite pandas and their favorite snacks delivered to
                your habitat, fast.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<UtensilsCrossed />}
                title="Tame New Pandas"
                description="Discover and collect a wide variety of unique pandas with AI-generated backstories."
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
                icon={<PandaIcon />}
                title="Complete Daily Tasks"
                description="Earn bamboo by completing fun daily bounties to fund your panda taming adventures."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background">
        <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PandaIcon className="h-6 w-6 text-primary" />
            <p className="text-sm">
              © {new Date().getFullYear()} Panda Delivery. All rights reserved.
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
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
