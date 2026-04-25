"use client";

import { useEffect, useState } from "react";

export default function LiveSessionTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return <p className="text-sm text-harbor">Live session: {Math.floor(seconds / 60)}m {seconds % 60}s</p>;
}
