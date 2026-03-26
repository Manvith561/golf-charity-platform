"use client";

import { useEffect, useState } from "react";

export default function MainDashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [user, setUser] = useState("");

  // GET USER FROM LOCAL STORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/auth";
    } else {
      setUser(storedUser);
      fetchData(storedUser);
    }
  }, []);

  // FETCH DATA
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

  // SAVE SCORE
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

      const data = await res.json();

      if (res.ok) {
        setScore("");
        fetchData(user);
      } else {
        alert(data.error || "Error saving score");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  // BEST SCORE
  const bestScore =
    scores.length > 0
      ? Math.max(...scores.map((s) => s.score))
      : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white px-4">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="opacity-80">Track your game. Win rewards. Give back.</p>
      </div>

      {/* INPUT CARD */}
      <div className="bg-white/20 backdrop-blur-lg p-5 rounded-2xl shadow-xl flex gap-3 mb-8">
        <input
          type="number"
          placeholder="Enter score"
          className="px-4 py-2 rounded-lg text-black w-52 outline-none shadow"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={saveScore}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold shadow-md transition"
        >
          Save
        </button>
      </div>

      {/* STATS */}
      <div className="bg-white/20 backdrop-blur-lg px-10 py-6 rounded-2xl shadow-xl mb-10 text-center">
        <p className="text-lg">🎮 Games Played: <b>{scores.length}</b></p>
        <p className="text-lg">🏆 Best Score: <b>{bestScore}</b></p>
        <p className="text-lg">💰 Rewards: <b>₹{bestScore * 10}</b></p>
      </div>

      {/* LAST SCORE */}
      {scores.length > 0 && (
        <div className="mb-8 text-center">
          <h2 className="font-semibold mb-1">Your Latest Score</h2>
          <p className="text-sm opacity-90">
            {scores[scores.length - 1].score} •{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      )}

      {/* LEADERBOARD */}
      <div className="w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          🏆 Leaderboard
        </h2>

        {leaderboard.map((u: any, i: number) => {
          const medals = ["🥇", "🥈", "🥉"];

          return (
            <div
              key={i}
              className={`flex justify-between items-center p-4 rounded-xl mb-3 shadow-lg transition hover:scale-[1.02] ${
                i === 0
                  ? "bg-yellow-300 text-black font-bold"
                  : "bg-white/20 backdrop-blur-lg"
              }`}
            >
              <span>
                {medals[i] || `#${i + 1}`}{" "}
                {u.email?.split("@")[0]}
              </span>
              <span className="font-semibold">{u.score}</span>
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