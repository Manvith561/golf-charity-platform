import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  email: String,
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Score || mongoose.model("Score", ScoreSchema);