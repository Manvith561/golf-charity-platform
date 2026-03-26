import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  score: Number,
  date: Date,
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  charity: String,
  isSubscribed: Boolean,
  scores: {
    type: [ScoreSchema],
    default: [], // 🔥 IMPORTANT
  },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);