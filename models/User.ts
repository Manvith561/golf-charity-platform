import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  score: Number,
  date: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,

  // NEW
  isSubscribed: { type: Boolean, default: true },
  charity: { type: String, default: "Helping Hands" },

  scores: [ScoreSchema],
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);