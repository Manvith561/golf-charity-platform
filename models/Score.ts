import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  email: String,
  score: Number,
});

export default mongoose.models.Score || mongoose.model("Score", ScoreSchema);