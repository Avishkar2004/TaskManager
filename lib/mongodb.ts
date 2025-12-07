import { MongoClient } from "mongodb";

// MongoDB connection string - should be in environment variables
const uri = process.env.MONGODB_URI || "";

// Options for MongoDB connection
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Check if we're in development mode
if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to prevent multiple connections
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the client promise for use in API routes
export default clientPromise;

