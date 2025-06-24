
"use client";

import { useState } from "react";
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
import { Settings as SettingsIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut } from "@/app/(auth)/actions";

export default function SettingsPage() {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);

  return (
    <div className="container max-w-2xl mx-auto py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-fredoka flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 md:w-9 md:h-9 text-primary" /> Settings
        </h1>
        <p className="text-muted-foreground text-base mt-2">
          Manage your account and game preferences.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Display</CardTitle>
            <CardDescription>
              Customize the look and feel of the app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <Label htmlFor="theme" className="font-medium">
                Theme
              </Label>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Audio</CardTitle>
            <CardDescription>Control the in-game sounds.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <Label htmlFor="music" className="font-medium">
                Background Music
              </Label>
              <Switch
                id="music"
                checked={musicEnabled}
                onCheckedChange={setMusicEnabled}
                aria-label="Toggle background music"
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <Label htmlFor="sfx" className="font-medium">
                Sound Effects
              </Label>
              <Switch
                id="sfx"
                checked={sfxEnabled}
                onCheckedChange={setSfxEnabled}
                aria-label="Toggle sound effects"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-destructive/50">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account information and actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={signOut} className="w-full">
              <Button type="submit" className="w-full" size="lg">
                Logout
              </Button>
            </form>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full" size="lg">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Yes, delete my account</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
