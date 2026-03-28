"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">

      <h1 className="text-5xl font-bold mb-6">🏌️ Golf Platform</h1>

      <p className="mb-10 text-lg">
        Track scores • Play draws • Win rewards
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push("/login")}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Signup
        </button>
      </div>

    </div>
  );
}