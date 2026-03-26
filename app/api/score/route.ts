export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";

// GET leaderboard + scores
export async function GET() {
  try {
    await connectDB();

    // Get all scores
    const scores = await Score.find();

    // Leaderboard aggregation
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching scores" },
      { status: 500 }
    );
  }
}

// POST new score
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, score } = body;

    const newScore = await Score.create({
      email,
      score,
    });

    return NextResponse.json(newScore);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error saving score" },
      { status: 500 }
    );
  }
}