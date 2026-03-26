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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white px-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>

      {/* SUBTITLE */}
      <p className="mb-6 text-sm opacity-90 text-center">
        Track your game. Win rewards. Give back.
      </p>

      {/* INPUT */}
      <div className="flex gap-3 mb-8">
        <input
          type="number"
          placeholder="Enter score"
          className="px-4 py-2 rounded-lg text-black w-56 shadow-md outline-none"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={saveScore}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold shadow-md"
        >
          Save Score
        </button>
      </div>

      {/* STATS CARD */}
      <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl shadow-lg mb-8 text-center">
        <p>Games Played: {scores.length}</p>
        <p>Best Score: {bestScore}</p>
        <p>Rewards Earned: ₹{bestScore * 10}</p>
      </div>

      {/* USER SCORES */}
      <div className="mb-6 text-center">
        <h2 className="font-semibold">Your Scores</h2>
        {scores.slice(-1).map((s: any, i: number) => (
          <p key={i} className="text-sm mt-1">
            Score: {s.score} | Date: {new Date().toLocaleDateString()}
          </p>
        ))}
      </div>

      {/* LEADERBOARD */}
      <div className="w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">
          🏆 Leaderboard
        </h2>

        {leaderboard.map((u: any, i: number) => {
          const medals = ["🥇", "🥈", "🥉"];

          return (
            <div
              key={i}
              className={`p-4 rounded-xl mb-3 text-center shadow-lg ${
                i === 0
                  ? "bg-yellow-300 text-black font-bold"
                  : "bg-white/20 backdrop-blur-lg"
              }`}
            >
              <div className="text-lg font-semibold">
                {medals[i] || `#${i + 1}`} — {u.email.split("@")[0]}
              </div>
              <div className="text-sm">Score: {u.score}</div>
            </div>
          );
        })}
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