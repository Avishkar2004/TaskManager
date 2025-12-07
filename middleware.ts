import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect routes
 * This runs on every request and can be used to check authentication
 * For now, we're handling auth in the API routes and pages
 * This is a placeholder for future route protection
 */
export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  // Authentication is handled in API routes and page components
  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

