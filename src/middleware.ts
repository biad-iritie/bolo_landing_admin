import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of admin paths that require authentication
const adminPaths = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if the path is an admin path
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

  // Get the access token from cookies
  const accessToken = request.cookies.get("accessToken");

  // If it's an admin path and there's no token, redirect to login
  if (isAdminPath && !accessToken) {
    const url = new URL("/", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // If there's a token but trying to access login/register, redirect to admin
  if (accessToken && pathname === "/") {
    const redirectTo = searchParams.get("redirect") || "/admin";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // Add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500";
  console.log("API URL for CSP:", apiUrl); // Debug log
  response.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; connect-src 'self' ${apiUrl} ws: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;`
  );

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (auth endpoints)
     * 2. /_next/* (Next.js internals)
     * 3. /favicon.ico, /sitemap.xml (static files)
     * 4. /public/* (public files)
     */
    "/((?!api/auth|_next|favicon.ico|sitemap.xml|public).*)",
  ],
};
