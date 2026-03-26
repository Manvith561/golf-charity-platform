"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [stats, setStats] = useState({
    games: 0,
    best: 0,
    rewards: 0,
  });

  const email =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/score?email=${email}`);
      const data = await res.json();

      setScores(data.scores || []);
      setLeaderboard(data.leaderboard || []);

      if (data.scores && data.scores.length > 0) {
        const best = Math.max(...data.scores.map((s: any) => s.score));
        const rewards = data.scores.reduce(
          (acc: number, s: any) => acc + s.score * 10,
          0
        );

        setStats({
          games: data.scores.length,
          best,
          rewards,
        });
      }
    };

    if (email) fetchData();
  }, [email]);

  // SAVE SCORE
  const saveScore = async () => {
    if (!score) return alert("Enter score");

    await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        score: Number(score),
      }),
    });

    setScore("");

    // refresh data
    const res = await fetch(`/api/score?email=${email}`);
    const data = await res.json();

    setScores(data.scores || []);
    setLeaderboard(data.leaderboard || []);

    if (data.scores && data.scores.length > 0) {
      const best = Math.max(...data.scores.map((s: any) => s.score));
      const rewards = data.scores.reduce(
        (acc: number, s: any) => acc + s.score * 10,
        0
      );

      setStats({
        games: data.scores.length,
        best,
        rewards,
      });
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/auth";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#2c5364)",
        color: "white",
        textAlign: "center",
        paddingTop: "60px",
      }}
    >
      <h2>Welcome Back 👋</h2>
      <p>Track your game. Win rewards. Give back.</p>

      {/* INPUT */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={saveScore}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Score
        </button>
      </div>

      {/* STATS */}
      <div
        style={{
          margin: "30px auto",
          padding: "20px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          width: "260px",
        }}
      >
        <p>Games Played: {stats.games}</p>
        <p>Best Score: {stats.best}</p>
        <p>Rewards Earned: ₹{stats.rewards}</p>
      </div>

      {/* SCORES */}
      <div>
        <h3>Your Scores</h3>
        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          scores.map((s: any, i: number) => (
            <div key={i}>
              Score: {s.score} | Date:{" "}
              {new Date(s.createdAt).toLocaleDateString()}
            </div>
          ))
        )}
      </div>

      {/* LEADERBOARD */}
      <div style={{ marginTop: "40px" }}>
        <h3>🏆 Leaderboard</h3>

        {leaderboard.length === 0 ? (
          <p>No leaderboard data</p>
        ) : (
          leaderboard.map((item: any, index: number) => {
            const currentUser =
              typeof window !== "undefined"
                ? localStorage.getItem("userEmail")
                : null;

            return (
              <div
                key={index}
                style={{
                  background:
                    item.email === currentUser
                      ? "rgba(255,215,0,0.3)"
                      : "rgba(255,255,255,0.1)",
                  margin: "10px auto",
                  padding: "12px",
                  borderRadius: "10px",
                  width: "280px",
                }}
              >
                <b>
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`}
                </b>

                {" — "}
                {item.email.split("@")[0]}

                <div>Score: {item.score}</div>
              </div>
            );
          })
        )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
      >
        Logout
      </button>
    </div>
  );
}