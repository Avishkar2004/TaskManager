import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import { z } from "zod";
import { ObjectId } from "mongodb";

// Validation schema for updating a task
const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

/**
 * GET /api/tasks/[id]
 * Get a specific task by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate task ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const tasksCollection = db.collection("tasks");

    // Find task by ID and user ID (ensure user owns the task)
    const task = await tasksCollection.findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(userId),
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Return task
    return NextResponse.json(
      {
        task: {
          id: task._id.toString(),
          title: task.title,
          description: task.description || "",
          completed: task.completed || false,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get task error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/tasks/[id]
 * Update a specific task
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate task ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();

    // Validate input data
    const validationResult = updateTaskSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const updateData = validationResult.data;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const tasksCollection = db.collection("tasks");

    // Check if task exists and belongs to user
    const existingTask = await tasksCollection.findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(userId),
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update task
    const updatedTask = {
      ...updateData,
      updatedAt: new Date(),
    };

    await tasksCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedTask }
    );

    // Get updated task
    const task = await tasksCollection.findOne({
      _id: new ObjectId(params.id),
    });

    // Return updated task
    return NextResponse.json(
      {
        message: "Task updated successfully",
        task: {
          id: task!._id.toString(),
          title: task!.title,
          description: task!.description || "",
          completed: task!.completed || false,
          createdAt: task!.createdAt,
          updatedAt: task!.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * Delete a specific task
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate task ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const tasksCollection = db.collection("tasks");

    // Check if task exists and belongs to user
    const existingTask = await tasksCollection.findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(userId),
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Delete task
    await tasksCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    // Return success message
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete task error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
