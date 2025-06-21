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
import { Crown, Leaf, Sparkles, LogIn } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LeaderboardPage() {
  const { session, login } = useGame();

  if (session.status === "loading") {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-9 w-1/3" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="rounded-lg border h-96 w-full" />
      </div>
    );
  }

  if (session.status === "guest") {
    return (
      <div className="flex flex-col items-center justify-center text-center flex-1 gap-4 p-8 bg-card rounded-xl border-2 border-dashed">
        <Crown className="h-16 w-16 text-primary" />
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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline flex items-center gap-2">
          <Trophy className="text-primary" /> Leaderboard
        </h1>
        <p className="text-muted-foreground text-lg mt-1">
          See who's at the top of the bamboo food chain.
        </p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Bamboo</TableHead>
              <TableHead className="text-right">Ultra Rares</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((user) => (
              <TableRow
                key={user.rank}
                className={cn("h-20", user.rank <= 3 ? "font-bold" : "")}
              >
                <TableCell className="text-xl text-center font-headline">
                  {user.rank === 1 && (
                    <Crown className="h-7 w-7 text-yellow-500 inline-block" />
                  )}
                  {user.rank === 2 && (
                    <Crown className="h-7 w-7 text-gray-400 inline-block" />
                  )}
                  {user.rank === 3 && (
                    <Crown className="h-7 w-7 text-yellow-700 inline-block" />
                  )}
                  {user.rank > 3 && user.rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
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
                      <p className="font-bold text-base">{user.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.title}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    {user.bamboo.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Sparkles className="h-5 w-5 text-accent-foreground" />
                    {user.ultraRares}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
