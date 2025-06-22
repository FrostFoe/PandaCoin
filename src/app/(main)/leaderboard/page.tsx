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
import { Crown, Leaf, Sparkles, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  return (
    <div className="container py-6 md:py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Trophy className="w-8 h-8 md:w-9 md:h-9 text-primary" /> Leaderboard
        </h1>
        <p className="text-muted-foreground text-base mt-2">
          See who's at the top of the bamboo food chain.
        </p>
      </div>

      <Card className="overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary">
                <TableHead className="w-20 text-center font-bold">
                  Rank
                </TableHead>
                <TableHead className="min-w-[200px] font-bold">User</TableHead>
                <TableHead className="text-right font-bold">Bamboo</TableHead>
                <TableHead className="text-right font-bold hidden sm:table-cell">
                  Ultra Rares
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user) => (
                <TableRow key={user.rank} className="h-20">
                  <TableCell className="text-lg text-center font-bold">
                    <div className="flex items-center justify-center">
                      {user.rank === 1 && (
                        <Crown className="h-6 w-6 text-yellow-500 mr-2" />
                      )}
                      {user.rank === 2 && (
                        <Crown className="h-6 w-6 text-gray-400 mr-2" />
                      )}
                      {user.rank === 3 && (
                        <Crown className="h-6 w-6 text-orange-500 mr-2" />
                      )}
                      {user.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 shrink-0">
                        <AvatarImage
                          src={user.avatarUrl}
                          alt={user.username}
                          data-ai-hint="user avatar"
                        />
                        <AvatarFallback>
                          {user.username.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-base">{user.username}</p>
                        <p className="text-sm text-muted-foreground hidden sm:block">
                          {user.title}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-base">
                    <div className="flex items-center justify-end gap-1.5">
                      <Leaf className="h-4 w-4 text-green-500" />
                      {user.bamboo.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-base hidden sm:table-cell">
                    <div className="flex items-center justify-end gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary" />
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
