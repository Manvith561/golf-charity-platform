import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Score from "@/models/Score";

export async function POST(req: Request) {
  await dbConnect();

  const { email, score } = await req.json();

  if (!email || score === undefined) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const newScore = new Score({
    email,
    score,
    createdAt: new Date(),
  });

  await newScore.save();

  return NextResponse.json({ message: "Score saved" });
}

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  let scores = [];
  if (email) {
    scores = await Score.find({ email }).sort({ createdAt: -1 });
  }

  const leaderboard = await Score.aggregate([
    {
      $group: {
        _id: "$email",
        bestScore: { $max: "$score" },
      },
    },
    {
      $sort: { bestScore: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  const formattedLeaderboard = leaderboard.map((item) => ({
    email: item._id,
    score: item.bestScore,
  }));

  return NextResponse.json({
    scores,
    leaderboard: formattedLeaderboard,
  });
}