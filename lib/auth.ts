import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// Secret key for JWT - should be in environment variables
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

/**
 * Generate a JWT token for a user
 * @param userId - The user's ID
 * @returns JWT token string
 */
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify a JWT token and extract user ID
 * @param token - JWT token string
 * @returns User ID if token is valid, null otherwise
 */
export function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

/**
 * Get user ID from request cookies
 * @param request - Next.js request object
 * @returns User ID if authenticated, null otherwise
 */
export function getUserIdFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return null;
  }
  return verifyToken(token);
}
