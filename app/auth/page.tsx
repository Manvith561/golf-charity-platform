"use client";

import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, isLogin }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", email);
      window.location.href = "/dashboard";
    } else {
      alert(data.message || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {isLogin ? "Login" : "Signup"}
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-3 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-4 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-blue-600 cursor-pointer"
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>

    </div>
  );
}