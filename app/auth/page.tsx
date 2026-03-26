"use client";

import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Signup successful");
      window.location.href = "/";
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800">
      <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md w-80 text-center">
        <h2 className="text-white text-xl mb-4">Signup</h2>

        <input
          className="w-full p-2 mb-3 rounded bg-white/20 text-white placeholder-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-white/20 text-white placeholder-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-white text-black py-2 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}