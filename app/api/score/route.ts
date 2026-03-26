import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";

export async function GET() {
  await connectDB();

  const scores = await Score.find().sort({ score: -1 }).limit(5);

  return NextResponse.json(scores);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { email, score } = body;

  const newScore = await Score.create({ email, score });

  return NextResponse.json(newScore);
}