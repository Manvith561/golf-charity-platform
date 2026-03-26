import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/golfDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB error", error);
  }
};

export default connectDB;