"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "../../src/lib/auth";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    const { error } = await signupUser(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful 🎉");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">

        <h1 className="text-2xl font-bold text-center mb-6">
          🚀 Create Account
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-white/80">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="underline cursor-pointer hover:text-white"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}