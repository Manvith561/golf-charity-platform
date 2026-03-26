import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB ERROR:", error);
    throw new Error("DB connection failed");
  }
}