import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, score } = await req.json();

    // ✅ FIX: allow score = 0
    if (!email || score === undefined) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await Score.create({ email, score });

    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    console.log("SCORE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const scores = await Score.find().sort({ score: -1 });

    return NextResponse.json(scores);
  } catch (error) {
    console.log("GET ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}