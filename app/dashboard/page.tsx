"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../src/lib/supabaseClient";
import {
  addScore,
  getScores,
  logoutUser,
} from "../../src/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [draw, setDraw] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);

  // ✅ CHECK USER
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        loadScores(data.user.id);
      }
    };

    checkUser();
  }, []);

  // ✅ LOAD SCORES
  const loadScores = async (userId: string) => {
    const data = await getScores(userId);
    setScores(data || []);
  };

  // ✅ ADD SCORE
  const handleAddScore = async () => {
    if (!score) return alert("Enter score");

    const num = Number(score);

    if (num < 1 || num > 45) {
      return alert("Score must be between 1 and 45");
    }

    await addScore(user.id, num);

    setScore("");
    loadScores(user.id);
  };

  // ✅ GENERATE DRAW
  const handleDraw = () => {
    const numbers: number[] = [];

    while (numbers.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(n)) numbers.push(n);
    }

    setDraw(numbers);

    // check result
    const userScores = scores.map((s) => s.score);
    const matches = numbers.filter((n) => userScores.includes(n));

    setResult({
      matches: matches.length,
      numbers: matches,
    });
  };

  // ✅ LOGOUT
  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md">
        <h2 className="text-xl font-bold">🏌️ Golf Platform</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="p-8">

        {/* USER CARD */}
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl mb-8">
          <h1 className="text-2xl font-bold mb-2">
            🎉 Welcome {user?.email.split("@")[0]}
          </h1>
          <p className="text-white/80">{user?.email}</p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* ADD SCORE */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h3 className="font-semibold mb-4 text-lg">⛳ Add Score</h3>

            <input
              type="number"
              placeholder="1 - 45"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full p-3 rounded-lg text-black mb-4"
            />

            <button
              onClick={handleAddScore}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-2 rounded-lg hover:opacity-90"
            >
              Add Score
            </button>
          </div>

          {/* SCORES */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h3 className="font-semibold mb-4 text-lg">📊 Your Scores</h3>

            {scores.length === 0 ? (
              <p className="text-white/70">No scores yet</p>
            ) : (
              <div className="space-y-2">
                {scores.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-white/10 px-3 py-2 rounded-lg"
                  >
                    <span>🎯 Score</span>
                    <span className="font-bold">{s.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DRAW */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h3 className="font-semibold mb-4 text-lg">🎲 Draw</h3>

            <button
              onClick={handleDraw}
              className="w-full bg-green-500 py-2 rounded-lg hover:bg-green-600"
            >
              Generate Draw
            </button>

            {draw.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {draw.map((n, i) => (
                  <span
                    key={i}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RESULT */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h3 className="font-semibold mb-4 text-lg">🏆 Result</h3>

            {result ? (
              <div className="space-y-2">
                <p className="text-lg">
                  Matches: <span className="font-bold">{result.matches}</span>
                </p>

                <p
                  className={`font-bold text-lg ${
                    result.matches > 1
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {result.matches > 1
                    ? "🎉 You Won!"
                    : "❌ Try Again"}
                </p>
              </div>
            ) : (
              <p className="text-white/70">No draw yet</p>
            )}
          </div>
        </div>

        {/* SUBSCRIPTION */}
        <div className="mt-8 max-w-sm bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold mb-2">📦 Subscription</h3>
          <p className="mb-4">Inactive</p>

          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
            Upgrade
          </button>
        </div>

      </div>
    </div>
  );
}