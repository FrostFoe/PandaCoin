"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email) {
    return { error: "Email is required." };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Magic Link Sign In Error:", error.message);
    return { error: "Could not authenticate user. Please try again." };
  }

  return { message: "Check your email for your magic link!" };
}

export async function signInWithGithub() {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("GitHub Sign In Error:", error.message);
    return redirect("/login?error=Could not authenticate with GitHub");
  }

  return redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
