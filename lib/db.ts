import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(MONGO_URI);

  isConnected = true;
};