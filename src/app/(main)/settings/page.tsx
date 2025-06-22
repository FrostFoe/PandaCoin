
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useGame } from "@/context/GameContext";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  const { logout } = useGame();

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-3">
          <SettingsIcon className="w-7 h-7 text-primary" /> Settings
        </h1>
        <p className="text-muted-foreground text-base mt-1">
          Manage your account and game preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Display</CardTitle>
          <CardDescription>
            Customize the look and feel of the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <Label htmlFor="theme" className="font-medium">
              Theme
            </Label>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audio</CardTitle>
          <CardDescription>Control the in-game sounds.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <Label htmlFor="music" className="font-medium">
              Background Music
            </Label>
            <Switch id="music" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <Label htmlFor="sfx" className="font-medium">
              Sound Effects
            </Label>
            <Switch id="sfx" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Manage your account information and actions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={logout}>
            Logout
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
