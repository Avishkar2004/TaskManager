import { ObjectId } from "mongodb";

/**
 * User model interface
 * Defines the structure of a user document in MongoDB
 */
export interface User {
  _id?: ObjectId;
  email: string;
  password: string; // This will be hashed using bcrypt
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

