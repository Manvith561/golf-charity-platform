import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite in Next.js
export default mongoose.models.Score || mongoose.model("Score", ScoreSchema);