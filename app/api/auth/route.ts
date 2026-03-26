import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // ✅ LOGIN CASE
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return NextResponse.json({ message: "Wrong password" }, { status: 400 });
      }

      return NextResponse.json({ message: "Login successful" });
    }

    // ✅ SIGNUP CASE
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "Signup successful" });

  } catch (error) {
    console.log("AUTH ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}