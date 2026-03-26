import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("❌ Please define MONGO_URI in .env");
}

// 👇 Cache connection (important for Next.js)
let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "golf-charity", // you can change name
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.log("❌ DB Error:", error);
    throw error;
  }
}