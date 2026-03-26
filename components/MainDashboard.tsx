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
      body: JSON.stringify({
        email,
        score: Number(score),
      }),
    });

    setScore("");
    fetchScores();
  };

  const bestScore = scores.length
    ? Math.max(...scores.map((s) => s.score))
    : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome Back 👋
      </h1>

      {/* INPUT + BUTTON */}
      <div className="flex gap-3 mb-6">
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

      {/* STATS CARD */}
      <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-lg mb-6 text-center">
        <p>Games Played: {scores.length}</p>
        <p>Best Score: {bestScore}</p>
        <p>Rewards Earned: ₹{bestScore * 10}</p>
      </div>

      {/* USER SCORES */}
      <h2 className="font-semibold mb-2">Your Scores</h2>
      <div className="mb-6">
        {scores.map((s, i) => (
          <p key={i}>
            Score: {s.score} | Date: {new Date(s.createdAt).toLocaleDateString()}
          </p>
        ))}
      </div>

      {/* LEADERBOARD */}
      <h2 className="font-bold mb-3">🏆 Leaderboard</h2>

      <div className="w-72">
        {leaderboard.map((u, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl mb-2 text-center font-medium ${
              i === 0
                ? "bg-yellow-400 text-black"
                : "bg-white/20 backdrop-blur-md"
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