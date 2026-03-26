"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

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

    setScores(data.scores || []);
    setLeaderboard(data.leaderboard || []);
  };

  const submitScore = async () => {
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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-700 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Back 👋</h1>

      <div className="flex gap-2">
        <input
          className="text-black p-2 rounded"
          placeholder="Enter score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={submitScore}
          className="bg-green-500 px-4 rounded hover:bg-green-600"
        >
          Save Score
        </button>
      </div>

      <h2 className="mt-6 font-bold">Your Scores</h2>
      {scores.map((s: any, i) => (
        <p key={i}>{s.email} - {s.score}</p>
      ))}

      <h2 className="mt-6 font-bold">🏆 Leaderboard</h2>
      {leaderboard.map((u: any, i) => (
        <p key={i}>
          {i + 1}. {u.email} - {u.score}
        </p>
      ))}
    </div>
  );
}