import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB ERROR:", error);
  }
}