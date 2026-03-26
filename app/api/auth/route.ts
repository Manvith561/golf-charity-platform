import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  const user = await User.create({ email, password });

  return NextResponse.json(user);
}