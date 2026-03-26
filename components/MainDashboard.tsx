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

    setScores(data.userScores);
    setLeaderboard(data.leaderboard);
  };

  const submitScore = async () => {
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
    <div className="flex flex-col items-center p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome Back 👋</h1>

      <div className="mb-4">
        <input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter score"
          className="p-2 text-black rounded mr-2"
        />
        <button
          onClick={submitScore}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Save Score
        </button>
      </div>

      <div className="bg-white text-black p-4 rounded mb-4">
        <p>Games Played: {scores.length}</p>
        <p>Best Score: {bestScore}</p>
        <p>Rewards Earned: ₹{bestScore * 10}</p>
      </div>

      <h2 className="font-bold mb-2">Your Scores</h2>
      {scores.map((s, i) => (
        <p key={i}>Score: {s.score}</p>
      ))}

      <h2 className="font-bold mt-4">🏆 Leaderboard</h2>
      {leaderboard.map((u, i) => (
        <div
          key={i}
          className={`p-2 rounded my-1 ${
            i === 0 ? "bg-yellow-400 text-black" : "bg-white text-black"
          }`}
        >
          {i + 1}. {u.email} - {u.score}
        </div>
      ))}
    </div>
  );
}