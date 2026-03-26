"use client";

import { useEffect, useState } from "react";

export default function MainDashboad({ email }: any) {
  const [score, setScore] = useState("");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [myScores, setMyScores] = useState<any[]>([]);

  const fetchLeaderboard = async () => {
    const res = await fetch("/api/leaderboard");
    const data = await res.json();
    setLeaderboard(data);
  };

  const fetchMyScores = async () => {
    const res = await fetch(`/api/myscore?email=${email}`);
    const data = await res.json();
    setMyScores(data);
  };

  const handleSave = async () => {
    await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, score: Number(score) }),
    });

    setScore("");
    fetchLeaderboard();
    fetchMyScores();
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchMyScores();
  }, []);

  const bestScore =
    myScores.length > 0
      ? Math.max(...myScores.map((s: any) => s.score))
      : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white">
      <div className="w-full max-w-md text-center">

        <h1 className="text-2xl font-bold">Welcome Back 👋</h1>

        <input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter score"
          className="p-2 rounded text-black mt-4"
        />

        <button
          onClick={handleSave}
          className="bg-yellow-400 px-4 py-2 rounded mt-2 text-black"
        >
          Save Score
        </button>

        <div className="bg-white text-black p-4 rounded mt-4">
          <p>Games Played: {myScores.length}</p>
          <p>Best Score: {bestScore}</p>
        </div>

        <div className="mt-4">
          <h2>Your Scores</h2>
          {myScores.map((s, i) => (
            <p key={i}>{s.score}</p>
          ))}
        </div>

        <div className="mt-4">
          <h2>🏆 Leaderboard</h2>
          {leaderboard.map((u, i) => (
            <div key={i} className="bg-white text-black p-2 my-2 rounded">
              {i + 1}. {u.email} — {u.score}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}