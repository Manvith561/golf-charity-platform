import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

// ✅ SAVE SCORE
export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, score } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    if (!user.scores) user.scores = [];

    user.scores.push({
      score: Number(score),
      date: new Date(),
    });

    await user.save();

    return NextResponse.json({
      success: true,
      scores: user.scores,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" });
  }
}

// ✅ GET LEADERBOARD
export async function GET() {
  try {
    await connectDB();

    const users = await User.find();

    const leaderboard = users
      .map((u: any) => {
        const bestScore =
          u.scores && u.scores.length > 0
            ? Math.max(...u.scores.map((s: any) => s.score))
            : 0;

        return {
          email: u.email,
          score: bestScore,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return NextResponse.json({ leaderboard });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" });
  }
}