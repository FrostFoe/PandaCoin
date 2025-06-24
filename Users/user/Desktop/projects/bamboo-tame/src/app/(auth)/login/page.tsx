"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PandaIcon } from "@/components/icons/panda-icon";
import { signInWithMagicLink, signInWithGithub } from "@/app/(auth)/actions";
import { useToast } from "@/hooks/use-toast";
import { Github } from "lucide-react";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleMagicLinkSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    } else {
      toast({
        title: "Magic Link Sent!",
        description: "Check your email for the sign-in link.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <PandaIcon className="h-12 w-12 mx-auto text-primary" />
          <CardTitle className="mt-4 text-2xl font-fredoka">Welcome!</CardTitle>
          <CardDescription>
            Sign in or create an account to start taming pandas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={signInWithGithub}>
            <Button variant="outline" className="w-full" type="submit">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form id="magic-link-form" onSubmit={handleMagicLinkSubmit}>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            form="magic-link-form"
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Magic Link"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
