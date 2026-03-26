"use client";

import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Signup successful");
        window.location.href = "/login";
      } else {
        alert(data.message || "Error");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-[300px] text-center">
        <h2 className="text-white text-2xl mb-4">Signup</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-white/20 text-white placeholder-white outline-none"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-2 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}