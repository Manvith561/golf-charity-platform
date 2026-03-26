import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, score } = await req.json();

    if (!email || score === undefined) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await Score.create({ email, score });

    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const scores = await Score.find().sort({ score: -1 });

    return NextResponse.json(scores);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}