import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

let db: any;

export const connectToMongoDB = async () => {
  try {
    await client.connect();
    db = client.db("serverProject");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectToMongoDB first.");
  }
  return db;
};