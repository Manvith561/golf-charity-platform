import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Score from "@/models/Score";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, score } = await req.json();

    if (!email || !score) {
      return NextResponse.json(
        { message: "Missing data" },
        { status: 400 }
      );
    }

    await Score.create({ email, score });

    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const scores = await Score.find().sort({ createdAt: -1 });

    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: "$email",
          maxScore: { $max: "$score" },
        },
      },
      { $sort: { maxScore: -1 } },
      { $limit: 5 },
    ]);

    return NextResponse.json({
      scores,
      leaderboard: leaderboard.map((u) => ({
        email: u._id,
        score: u.maxScore,
      })),
    });
  } catch {
    return NextResponse.json({ message: "Error" });
  }
}