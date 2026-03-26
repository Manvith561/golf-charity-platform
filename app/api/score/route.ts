import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // ✅ FIXED
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, score } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    // ✅ ADD NEW SCORE WITH DATE
    user.scores.push({
      score,
      date: new Date(),
    });

    // ✅ KEEP ONLY LAST 5 SCORES
    if (user.scores.length > 5) {
      user.scores.shift();
    }

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