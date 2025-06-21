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
import { Crown, Leaf, Sparkles } from "lucide-react";
  
export default function LeaderboardPage() {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><Crown className="text-accent" /> Leaderboard</h1>
          <p className="text-muted-foreground">See who's at the top of the bamboo food chain.</p>
        </div>
        
        <div className="rounded-lg border">
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
                        <TableRow key={user.rank}>
                            <TableCell className="font-bold text-lg text-center">{user.rank}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={user.avatarUrl} alt={user.username} data-ai-hint="panda avatar"/>
                                        <AvatarFallback>{user.username.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{user.username}</p>
                                        <p className="text-sm text-muted-foreground">{user.title}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                                <div className="flex items-center justify-end gap-1">
                                    <Leaf className="h-4 w-4 text-primary" />
                                    {user.bamboo.toLocaleString()}
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                                <div className="flex items-center justify-end gap-1">
                                    <Sparkles className="h-4 w-4 text-accent" />
                                    {user.ultraRares}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </div>
    );
}
