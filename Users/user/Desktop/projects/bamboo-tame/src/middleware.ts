import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // This function will also handle throwing an error if env vars are missing.
  const { response, user } = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = [
    "/dashboard",
    "/tame",
    "/pandas",
    "/settings",
    "/leaderboard",
    "/admin",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If the user is not authenticated and is trying to access a protected route, redirect to login
  if (!user && isProtectedRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and trying to access the admin route
  if (user && pathname.startsWith("/admin")) {
    if (!process.env.ADMIN_EMAIL) {
      const url = new URL("/dashboard", request.url);
      url.searchParams.set("error", "misconfigured_admin_access");
      return NextResponse.redirect(url);
    }
    if (user.email !== process.env.ADMIN_EMAIL) {
      const url = new URL("/dashboard", request.url);
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  // If the user is authenticated, redirect them from the login page or root to the dashboard
  if (user && (pathname === "/login" || pathname === "/")) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  // Continue with the response from updateSession
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/callback (Supabase auth callback)
     * - any files in the public folder (e.g., .svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
