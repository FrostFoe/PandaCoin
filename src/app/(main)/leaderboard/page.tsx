
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { leaderboard } from "@/lib/data";
import { Crown, Leaf, Sparkles, LogIn, Trophy } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  const { session, login } = useGame();

  if (session.status === "loading") {
    return (
      <div className="py-8 flex flex-col gap-8">
        <Skeleton className="h-12 w-full max-w-xs" />
        <Skeleton className="h-6 w-full max-w-md" />
        <Skeleton className="rounded-3xl border h-96 w-full" />
      </div>
    );
  }

  if (session.status === "guest") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 p-4 md:p-8 bg-card rounded-3xl border-2 border-dashed">
        <Trophy className="h-16 w-16 text-primary" />
        <h2 className="text-2xl font-bold font-headline">
          The Leaderboard Awaits!
        </h2>
        <p className="text-muted-foreground max-w-md">
          See how you stack up against other Panda Tamers. Log in or create an
          account to join the competition!
        </p>
        <Button onClick={login} size="lg">
          <LogIn className="mr-2" />
          Login to View Leaderboard
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline flex items-center gap-3">
          <Trophy className="w-9 h-9 md:w-10 md:h-10 text-primary" />{" "}
          Leaderboard
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          See who's at the top of the bamboo food chain.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 md:w-20 px-2 md:px-4 text-center">
                  Rank
                </TableHead>
                <TableHead className="px-2 md:px-4 min-w-[200px]">
                  User
                </TableHead>
                <TableHead className="text-right px-2 md:px-4">
                  Bamboo
                </TableHead>
                <TableHead className="text-right hidden sm:table-cell px-2 md:px-4">
                  Ultra Rares
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user) => (
                <TableRow
                  key={user.rank}
                  className={cn(
                    "h-20",
                    user.rank <= 3
                      ? "font-bold bg-secondary/50 dark:bg-secondary/30"
                      : "",
                    user.rank === 1
                      ? "bg-gradient-to-r from-yellow-100/50 via-secondary/50 to-secondary/50 dark:from-yellow-500/10 dark:via-secondary/30 dark:to-secondary/30"
                      : "",
                    user.rank === 2
                      ? "bg-gradient-to-r from-gray-200/50 via-secondary/50 to-secondary/50 dark:from-gray-400/10 dark:via-secondary/30 dark:to-secondary/30"
                      : "",
                    user.rank === 3
                      ? "bg-gradient-to-r from-orange-200/50 via-secondary/50 to-secondary/50 dark:from-orange-400/10 dark:via-secondary/30 dark:to-secondary/30"
                      : "",
                  )}
                >
                  <TableCell className="text-lg md:text-2xl text-center font-headline px-2 md:px-4">
                    {user.rank === 1 && (
                      <Crown className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 inline-block" />
                    )}
                    {user.rank === 2 && (
                      <Crown className="h-6 w-6 md:h-8 md:w-8 text-gray-400 inline-block" />
                    )}
                    {user.rank === 3 && (
                      <Crown className="h-6 w-6 md:h-8 md:w-8 text-orange-500 inline-block" />
                    )}
                    {user.rank > 3 && user.rank}
                  </TableCell>
                  <TableCell className="px-2 md:px-4">
                    <div className="flex items-center gap-2 md:gap-4">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 shrink-0">
                        <AvatarImage
                          src={user.avatarUrl}
                          alt={user.username}
                          data-ai-hint="panda avatar"
                        />
                        <AvatarFallback>
                          {user.username.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm md:text-base">
                          {user.username}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                          {user.title}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm md:text-base px-2 md:px-4">
                    <div className="flex items-center justify-end gap-1 md:gap-2">
                      <Leaf className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                      {user.bamboo.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm md:text-base hidden sm:table-cell px-2 md:px-4">
                    <div className="flex items-center justify-end gap-1 md:gap-2">
                      <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-accent-foreground" />
                      {user.ultraRares}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
