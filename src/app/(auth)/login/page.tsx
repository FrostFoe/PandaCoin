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
import { signInWithMagicLink } from "@/app/(auth)/actions";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        description: result.message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <PandaIcon className="h-12 w-12 mx-auto text-primary" />
          <CardTitle className="mt-4 text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your email to receive a magic link to sign in.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
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
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Magic Link"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
