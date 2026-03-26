import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

// 👉 SIGNUP
export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, charity } = await req.json();

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" });
    }

    // 🔥 CREATE USER WITH NEW FIELDS
    const user = await User.create({
      email,
      password,
      charity: charity || "Helping Hands", // default
      isSubscribed: true, // fake subscription
    });

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    return NextResponse.json({ error: "Signup failed" });
  }
}

// 👉 LOGIN
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email, password });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" });
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    return NextResponse.json({ error: "Login failed" });
  }
}