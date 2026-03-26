"use client";

import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // 🔥 SAVE USER (CRITICAL)
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } else {
      alert(data.error);
    }
  };

  const handleLogin = async () => {
    const res = await fetch("/api/auth", {
      method: "PUT",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // 🔥 SAVE USER (CRITICAL)
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-black">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login / Signup
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
        >
          Signup
        </button>

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}