import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URL}/${DB_NAME}`;
    
    // Ensure a fallback if connection string is missing
    if (!process.env.MONGODB_URL) {
      throw new Error("MongoDB URL is missing in environment variables.");
    }

    const connectionInstance = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`\nMongoDB connected successfully! DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default connectDB;
