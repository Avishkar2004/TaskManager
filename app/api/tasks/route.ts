import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import { z } from "zod";
import { ObjectId } from "mongodb";

// Validation schema for creating/updating a task
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});

/**
 * GET /api/tasks
 * Get all tasks for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const tasksCollection = db.collection("tasks");

    // Get all tasks for this user
    const tasks = await tasksCollection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 }) // Sort by newest first
      .toArray();

    // Format tasks for response
    const formattedTasks = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description || "",
      completed: task.completed || false,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    return NextResponse.json({ tasks: formattedTasks }, { status: 200 });
  } catch (error) {
    console.error("Get tasks error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Create a new task
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input data
    const validationResult = taskSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { title, description, completed } = validationResult.data;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const tasksCollection = db.collection("tasks");

    // Create new task
    const newTask = {
      title,
      description: description || "",
      completed: completed || false,
      userId: new ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await tasksCollection.insertOne(newTask);

    // Return created task
    return NextResponse.json(
      {
        message: "Task created successfully",
        task: {
          id: result.insertedId.toString(),
          title,
          description: description || "",
          completed: completed || false,
          createdAt: newTask.createdAt,
          updatedAt: newTask.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

