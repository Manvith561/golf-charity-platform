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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Welcome Back 👋
      </h1>

      {/* INPUT */}
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Enter score"
          className="p-2 rounded text-black"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={saveScore}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Save Score
        </button>
      </div>

      {/* STATS */}
      <div className="bg-white text-black p-5 rounded-xl shadow mb-6 text-center w-64">
        <p>Games Played: {scores.length}</p>
        <p>Best Score: {bestScore}</p>
        <p>Rewards Earned: ₹{bestScore * 10}</p>
      </div>

      {/* USER SCORES */}
      <div className="mb-6 w-64">
        <h2 className="font-semibold mb-2 text-center">Your Scores</h2>
        {scores.map((s: any, i: number) => (
          <div key={i} className="bg-white text-black p-2 rounded mb-2">
            Score: {s.score}
          </div>
        ))}
      </div>

      {/* LEADERBOARD */}
      <div className="w-64">
        <h2 className="font-semibold mb-2 text-center">🏆 Leaderboard</h2>
        {leaderboard.map((u: any, i: number) => (
          <div
            key={i}
            className={`p-2 rounded mb-2 text-black ${
              i === 0 ? "bg-yellow-300" : "bg-white"
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
        className="mt-6 underline"
      >
        Logout
      </button>

    </div>
  );
}