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

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error");
      return;
    }

    localStorage.setItem("user", email);
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-700">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Signup</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </div>
    </div>
  );
}