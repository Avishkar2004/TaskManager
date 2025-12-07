import { ObjectId } from "mongodb";

/**
 * Task model interface
 * Defines the structure of a task document in MongoDB
 */
export interface Task {
  _id?: ObjectId;
  title: string;
  description: string;
  completed: boolean;
  userId: ObjectId; // Reference to the user who owns this task
  createdAt?: Date;
  updatedAt?: Date;
}

