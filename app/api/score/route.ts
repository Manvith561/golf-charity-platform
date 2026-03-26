import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";

// GET leaderboard
export async function GET() {
  try {
    await connectDB();

    const scores = await Score.find().sort({ score: -1 }).limit(5);

    return NextResponse.json(scores);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// POST new score
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, score } = body;

    const newScore = await Score.create({ email, score });

    return NextResponse.json(newScore);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}