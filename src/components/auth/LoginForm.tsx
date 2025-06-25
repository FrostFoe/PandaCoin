"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { PandaIcon } from "@/components/shared/PandaIcon";
import { signInWithMagicLink, signInWithGithub } from "@/actions/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { Github, AlertTriangle } from "lucide-react";

interface LoginFormProps {
  mode: "login" | "signup";
}

export function LoginForm({ mode }: LoginFormProps) {
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

  const isLoginMode = mode === "login";

  return (
    <Card className="w-full max-w-sm border-2 shadow-xl rounded-2xl">
      <CardHeader className="text-center">
        <PandaIcon className="h-12 w-12 mx-auto text-primary" />
        <CardTitle className="mt-4 text-2xl font-fredoka">
          {isLoginMode ? "Welcome Back!" : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {isLoginMode
            ? "Sign in to continue your adventure."
            : "Join the adventure by creating an account."}
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
            {isLoginMode ? "Sign in with GitHub" : "Sign up with GitHub"}
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
            {isSubmitting
              ? "Sending..."
              : isLoginMode
              ? "Send Magic Link"
              : "Sign Up with Magic Link"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        {isLoginMode ? (
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
