import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Logout the current user by clearing the token cookie
 */
export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // Expire immediately
  });

  return response;
}
