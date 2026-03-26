"use client";

import { useEffect, useState } from "react";

export default function MainDashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/auth";
    } else {
      setUser(storedUser);
      fetchData(storedUser);
    }
  }, []);

  const fetchData = async (email: string) => {
    try {
      const res = await fetch(`/api/score?email=${email}`);
      const data = await res.json();
      setScores(data.userScores || []);
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.log(err);
    }
  };

  const saveScore = async () => {
    if (!score) return alert("Enter score");

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        body: JSON.stringify({
          email: user,
          score: Number(score),
        }),
      });

      if (res.ok) {
        setScore("");
        fetchData(user);
      } else {
        alert("Error saving score");
      }
    } catch {
      alert("Server error");
    }
  };

  const bestScore =
    scores.length > 0
      ? Math.max(...scores.map((s) => s.score))
      : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white px-4">

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
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="
            px-4 py-2 w-56 rounded-lg text-black shadow-md outline-none
            border-2 border-black
            focus:border-green-500
            focus:ring-2 focus:ring-green-300
            transition
          "
        />

        <button
          onClick={saveScore}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold shadow-md"
        >
          Save Score
        </button>
      </div>

      {/* STATS */}
      <div className="bg-white/20 backdrop-blur-lg px-8 py-5 rounded-2xl shadow-lg mb-8 text-center">
        <p>Games Played: {scores.length}</p>
        <p>Best Score: {bestScore}</p>
        <p>Rewards Earned: ₹{bestScore * 10}</p>
      </div>

      {/* LEADERBOARD */}
      <div className="w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">
          🏆 Leaderboard
        </h2>

        {leaderboard.map((u: any, i: number) => {
          return (
            <div
              key={i}
              className="p-4 rounded-xl mb-3 text-center shadow-lg bg-white text-black"
            >
              {i + 1}. {u.email} - {u.score}
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
        className="mt-10 text-sm opacity-70 hover:opacity-100 underline"
      >
        Logout
      </button>

    </div>
  );
}