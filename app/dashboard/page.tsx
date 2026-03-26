"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/auth";
    } else {
      setEmail(user);
      fetchScores();
    }
  }, []);

  const fetchScores = async () => {
    const res = await fetch("/api/score");
    const data = await res.json();
    setScores(data);
  };

  const saveScore = async () => {
    if (!score) return alert("Enter score");

    await fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({
        email,
        score: Number(score), // ✅ FIX
      }),
    });

    setScore("");
    fetchScores();
  };

  const userScores = scores.filter((s) => s.email === email);
  const bestScore = userScores.length
    ? Math.max(...userScores.map((s) => s.score))
    : 0;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <h1 className="text-2xl mb-4">Welcome Back 👋</h1>

      <div className="flex gap-2">
        <input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="p-2 text-black rounded"
          placeholder="Enter score"
        />
        <button onClick={saveScore} className="bg-green-500 px-4 rounded">
          Save Score
        </button>
      </div>

      <div className="bg-white text-black p-4 mt-4 rounded">
        <p>Games Played: {userScores.length}</p>
        <p>Best Score: {bestScore}</p>
        <p>Rewards: ₹{bestScore * 10}</p>
      </div>

      <h2 className="mt-4">Leaderboard</h2>

      {scores.slice(0, 5).map((s, i) => (
        <div key={i} className="bg-white text-black p-2 mt-2 rounded w-60">
          {i + 1}. {s.email} - {s.score}
        </div>
      ))}
    </div>
  );
}