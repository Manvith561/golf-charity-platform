"use client";

import { useState, useEffect } from "react";

export default function MainDashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [bestScore, setBestScore] = useState(0);

  const email =
    typeof window !== "undefined" ? localStorage.getItem("user") : "";

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    const res = await fetch("/api/score");
    const data = await res.json();

    setScores(data.userScores || []);
    setLeaderboard(data.leaderboard || []);

    if (data.userScores?.length > 0) {
      setBestScore(Math.max(...data.userScores.map((s: any) => s.score)));
    }
  };

  const saveScore = async () => {
    const res = await fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({
        email,
        score: Number(score),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setScore("");
      fetchScores();
    } else {
      alert(data.error || "Error saving score");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-10 tracking-wide drop-shadow-lg">
        Welcome Back 👋
      </h1>

      {/* INPUT */}
      <div className="flex items-center gap-3 mb-8">
        <input
          type="number"
          placeholder="Enter score"
          className="px-4 py-2 rounded-lg text-black w-56 shadow-md outline-none"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={saveScore}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Save Score
        </button>
      </div>

      {/* STATS */}
      <div className="bg-white text-black px-6 py-4 rounded-xl shadow-lg mb-8 w-72 text-center">
        <p className="mb-1 font-medium">Games Played: {scores.length}</p>
        <p className="mb-1 font-medium">Best Score: {bestScore}</p>
        <p className="font-medium">Rewards: ₹{bestScore * 10}</p>
      </div>

      {/* LEADERBOARD */}
      <div className="w-80">
        <h2 className="text-lg font-semibold mb-3 text-center">
          🏆 Leaderboard
        </h2>

        {leaderboard.map((u: any, i: number) => (
          <div
            key={i}
            className={`flex justify-between px-4 py-3 mb-3 rounded-lg shadow-md ${
              i === 0
                ? "bg-yellow-300 text-black font-bold scale-105"
                : "bg-white text-black"
            }`}
          >
            <span>{i + 1}. {u.email}</span>
            <span>{u.score}</span>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/auth";
        }}
        className="mt-8 text-sm underline opacity-80 hover:opacity-100"
      >
        Logout
      </button>

    </div>
  );
}