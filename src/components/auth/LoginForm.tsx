"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PandaIcon } from "@/components/shared/PandaIcon";
import { signInWithMagicLink, signInWithGithub } from "@/actions/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { Github, AlertTriangle } from "lucide-react";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDescription =
    searchParams.get("error_description") || "Please try again.";

  const handleMagicLinkSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const result = await signInWithMagicLink(formData);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: result.error,
      });
    } else if (result.message) {
      toast({
        title: "Magic Link Sent!",
        description: result.message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-sm border-2 shadow-xl rounded-2xl">
      <CardHeader className="text-center">
        <PandaIcon className="h-12 w-12 mx-auto text-primary" />
        <CardTitle className="mt-4 text-2xl font-fredoka">
          Welcome to Bamboo Tame
        </CardTitle>
        <CardDescription>
          Sign in or create an account to start your adventure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p>
              <strong>Login Failed:</strong> {errorDescription}
            </p>
          </div>
        )}
        <form action={signInWithGithub}>
          <Button
            variant="outline"
            className="w-full h-12 text-base"
            type="submit"
          >
            <Github className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form
          id="magic-link-form"
          onSubmit={handleMagicLinkSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="h-12 text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
