import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { email, password, type } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" });
  }

  const existingUser = await User.findOne({ email });

  if (type === "signup") {
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    await User.create({ email, password });

    return NextResponse.json({ message: "User created" });
  }

  if (type === "login") {
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" });
    }

    if (existingUser.password !== password) {
      return NextResponse.json({ message: "Invalid password" });
    }

    return NextResponse.json({ message: "Login successful" });
  }

  return NextResponse.json({ message: "Invalid request" });
}