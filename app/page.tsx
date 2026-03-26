"use client";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f172a, #1e3a8a)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>Golf Charity</h2>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ cursor: "pointer" }}>Features</span>
          <span style={{ cursor: "pointer" }}>How it Works</span>

          <button
            onClick={() => (window.location.href = "/auth")}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: "white",
              color: "black",
            }}
          >
            Join Now
          </button>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          animation: "fadeUp 1s ease",
        }}
      >
        <h1 style={{ fontSize: "48px", lineHeight: "1.2" }}>
          Play Golf.
          <br />
          Win Big.
          <br />
          Give Back.
        </h1>

        <p style={{ marginTop: "20px", opacity: 0.8 }}>
          Join a modern golf platform where your performance earns rewards
          and supports meaningful charities.
        </p>

        <button
          onClick={() => (window.location.href = "/auth")}
          style={{
            marginTop: "30px",
            padding: "12px 25px",
            borderRadius: "25px",
            border: "none",
            background: "white",
            color: "black",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Get Started
        </button>
      </div>

      {/* FEATURES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "60px",
          padding: "20px",
        }}
      >
        {[
          {
            title: "Track Scores",
            desc: "Enter and manage your golf scores easily",
          },
          {
            title: "Win Rewards",
            desc: "Compete and earn exciting prizes",
          },
          {
            title: "Support Charity",
            desc: "Your play helps meaningful causes",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.1)",
              width: "220px",
              textAlign: "center",
              transition: "0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            <h3>{item.title}</h3>
            <p style={{ opacity: 0.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div
        style={{
          marginTop: "80px",
          textAlign: "center",
          animation: "fadeUp 1.5s ease",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {[
            {
              step: "1️⃣",
              title: "Sign Up",
              desc: "Create your account",
            },
            {
              step: "2️⃣",
              title: "Enter Scores",
              desc: "Track your performance",
            },
            {
              step: "3️⃣",
              title: "Earn Rewards",
              desc: "Win & support charity",
            },
          ].map((item, i) => (
            <div key={i}>
              <h3>{item.step}</h3>
              <h4>{item.title}</h4>
              <p style={{ opacity: 0.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          padding: "20px",
          opacity: 0.6,
        }}
      >
        © 2026 Golf Charity Platform
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}