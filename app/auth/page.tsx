"use client";

import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        type: isLogin ? "login" : "signup",
      }),
    });

    const data = await res.json();

    if (data.message === "Login successful") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("subscribed", "false");
      window.location.href = "/dashboard";
    } else if (data.message === "User created") {
      alert("Signup successful! Now login.");
      setIsLogin(true);
    } else {
      alert(data.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to bottom, #0f172a, #1e3a8a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          padding: "30px",
          borderRadius: "12px",
          color: "white",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            background: "white",
            color: "black",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          style={{ marginTop: "15px", cursor: "pointer", opacity: 0.7 }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}