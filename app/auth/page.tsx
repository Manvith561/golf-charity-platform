"use client";

import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          isLogin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      // ✅ SUCCESS
      alert(isLogin ? "Login successful" : "Signup successful");

      // ✅ SAVE USER
      localStorage.setItem("user", email);

      // ✅ REDIRECT
      window.location.href = "/dashboard";

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-6 rounded shadow w-80 text-center">
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="mt-3 text-sm text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}