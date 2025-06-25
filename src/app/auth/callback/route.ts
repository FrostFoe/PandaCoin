import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // The `next` param is used for redirecting after login
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // URL is sanitized to prevent open redirect vulnerabilities
      const redirectUrl = new URL(next, origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If there's an error or no code, redirect to login with an error message
  console.error(
    "Auth Callback Error: Could not exchange code for session.",
    searchParams.get("error_description"),
  );
  const errorUrl = new URL("/login", origin);
  errorUrl.searchParams.set("error", "authentication_failed");
  errorUrl.searchParams.set(
    "error_description",
    searchParams.get("error_description") || "Could not sign you in. Please try again.",
  );
  return NextResponse.redirect(errorUrl);
}
