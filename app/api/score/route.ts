import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";

export async function POST(req: Request) {
  await connectDB();

  const { email, score } = await req.json();

  if (!email || !score) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await Score.create({ email, score });

  return NextResponse.json({ message: "Saved" });
}