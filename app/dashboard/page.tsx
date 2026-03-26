"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // ✅ LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      console.log("USER LOADED:", parsed); // 🔥 DEBUG
    }

    fetchLeaderboard();
  }, []);

  // ✅ GET LEADERBOARD
  const fetchLeaderboard = async () => {
    const res = await fetch("/api/score");
    const data = await res.json();
    setLeaderboard(data.leaderboard || []);
  };

  // ✅ SAVE SCORE
  const saveScore = async () => {
    if (!score || !user?.email) {
      alert("User not loaded");
      return;
    }

    console.log("Saving score for:", user.email); // 🔥 DEBUG

    await fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        score: Number(score),
      }),
    });

    setScore("");
    fetchLeaderboard(); // 🔥 refresh leaderboard
  };

  const bestScore =
    leaderboard.find((u) => u.email === user?.email)?.score || 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white px-4">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="opacity-80">
          Track your game. Win rewards. Give back.
        </p>
      </div>

      {/* INPUT */}
      <div className="bg-white/20 backdrop-blur-lg p-5 rounded-2xl shadow-xl flex gap-3 mb-8 border border-black">
        <input
          type="number"
          placeholder="Enter score"
          className="px-4 py-2 rounded-lg text-black w-52 border border-black outline-none"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={saveScore}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold"
        >
          Save
        </button>
      </div>

      {/* STATS */}
      <div className="bg-white text-black px-8 py-5 rounded-xl shadow-lg mb-8 text-center border border-black">
        <p>Best Score: {bestScore}</p>
        <p>Rewards: ₹{bestScore * 10}</p>
      </div>

      {/* LEADERBOARD */}
      <div className="w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">
          🏆 Leaderboard
        </h2>

        {leaderboard.map((u: any, i: number) => (
          <div
            key={i}
            className={`p-3 rounded-lg mb-2 border border-black text-center ${
              i === 0
                ? "bg-yellow-300 text-black font-bold"
                : "bg-white text-black"
            }`}
          >
            {i + 1}. {u.email} - {u.score}
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/auth";
        }}
        className="mt-10 underline"
      >
        Logout
      </button>
    </div>
  );
}