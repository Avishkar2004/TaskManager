import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import { ObjectId } from "mongodb";

/**
 * GET /api/auth/me
 * Get current authenticated user information
 */
export async function GET(request: NextRequest) {
  try {
    // Get user ID from token
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const usersCollection = db.collection("users");

    // Find user by ID
    const user = await usersCollection.findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data (without password)
    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
