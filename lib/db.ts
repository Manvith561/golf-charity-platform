import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://manvithhegde35_db_user:manvith123@cluster0.qxg58od.mongodb.net/golfDB?retryWrites=true&w=majority";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
    throw new Error("DB connection failed");
  }
}