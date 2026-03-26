"use client";

import { useEffect, useState } from "react";

export default function MainDashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      window.location.href = "/auth";
      return;
    }

    setUser(storedUser);

    fetchData(storedUser.email);
  }, []);

  const fetchData = async (email: string) => {
    const res = await fetch("/api/score?email=" + email);
    const data = await res.json();

    setScores(data.scores || []);
    setLeaderboard(data.leaderboard || []);
  };

  const saveScore = async () => {
    if (!score) return;

    const res = await fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        score: Number(score),
      }),
    });

    const data = await res.json();

    setScores(data.scores);
    setScore("");
    fetchData(user.email);
  };

  const bestScore =
    scores.length > 0
      ? Math.max(...scores.map((s) => s.score))
      : 0;

  // ❌ BLOCK IF NOT SUBSCRIBED
  if (user && !user.isSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please subscribe to access dashboard 🚫
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white px-4">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="opacity-80">
          Track your game. Win rewards. Give back.
        </p>
        <p className="text-sm mt-2 opacity-70">
          Charity: {user?.charity}
        </p>
      </div>

      {/* INPUT */}
      <div className="bg-white/20 backdrop-blur-lg p-5 rounded-2xl shadow-xl flex gap-3 mb-8 border border-black">
        <input
          type="number"
          placeholder="Enter score"
          className="px-4 py-2 rounded-lg text-black w-52 outline-none shadow border border-black"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={saveScore}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold shadow-md"
        >
          Save
        </button>
      </div>

      {/* STATS */}
      <div className="bg-white/20 backdrop-blur-lg px-10 py-6 rounded-2xl shadow-xl mb-10 text-center border border-black">
        <p>🎮 Games Played: {scores.length}</p>
        <p>🏆 Best Score: {bestScore}</p>
        <p>💰 Rewards: ₹{bestScore * 10}</p>
      </div>

      {/* LAST SCORE */}
      {scores.length > 0 && (
        <div className="mb-8 text-center">
          <h2 className="font-semibold">Latest Score</h2>
          <p className="text-sm">
            {scores[scores.length - 1].score} •{" "}
            {new Date(scores[scores.length - 1].date).toLocaleDateString()}
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
              className={`flex justify-between items-center p-4 rounded-xl mb-3 shadow-lg border border-black ${
                i === 0
                  ? "bg-yellow-300 text-black font-bold"
                  : "bg-white/20 backdrop-blur-lg"
              }`}
            >
              <span>
                {medals[i] || `#${i + 1}`}{" "}
                {u.email.split("@")[0]}
              </span>
              <span>{u.score}</span>
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
        className="mt-10 text-sm underline"
      >
        Logout
      </button>
    </div>
  );
}