"use client";

import { useEffect, useState } from "react";

export default function MainDashboard({ email }: { email: string }) {
  const [scores, setScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [score, setScore] = useState("");

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    const res = await fetch("/api/score");
    const data = await res.json();

    setScores(data.userScores || []);
    setLeaderboard(data.leaderboard || []);
  };

  const submitScore = async () => {
    if (!score) return;

    await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, score: Number(score) }),
    });

    setScore("");
    fetchScores();
  };

  const bestScore = scores.length
    ? Math.max(...scores.map((s) => s.score))
    : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white">

      <h1 className="text-3xl font-bold mb-6">Welcome Back 👋</h1>

      {/* INPUT */}
      <div className="flex gap-2 mb-6">
        <input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter score"
          className="px-4 py-2 rounded text-black w-48"
        />
        <button
          onClick={submitScore}
          className="bg-green-400 text-black px-4 py-2 rounded font-semibold hover:bg-green-500"
        >
          Save Score
        </button>
      </div>

      {/* STATS */}
      <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl mb-6 text-center">
        <p>Games Played: {scores.length}</p>
        <p>Best Score: {bestScore}</p>
        <p>Rewards Earned: ₹{bestScore * 10}</p>
      </div>

      {/* SCORES */}
      <h2 className="mb-2 font-semibold">Your Scores</h2>
      <div className="mb-6">
        {scores.map((s, i) => (
          <p key={i}>
            {s.score} — {new Date(s.createdAt).toLocaleDateString()}
          </p>
        ))}
      </div>

      {/* LEADERBOARD */}
      <h2 className="font-bold mb-2">🏆 Leaderboard</h2>

      <div className="w-64">
        {leaderboard.map((u, i) => (
          <div
            key={i}
            className={`p-3 rounded mb-2 text-center ${
              i === 0 ? "bg-yellow-400 text-black" : "bg-white/20"
            }`}
          >
            #{i + 1} — {u.email.split("@")[0]}  
            <br />
            Score: {u.score}
          </div>
        ))}
      </div>

    </div>
  );
}