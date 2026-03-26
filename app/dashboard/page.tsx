"use client";

import { useEffect, useState } from "react";
import MainDashboard from "@/components/MainDashboard";

export default function DashboardPage() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/auth";
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return null;

  return <MainDashboard email={user} />;
}