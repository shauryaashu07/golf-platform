import { supabase } from "./supabaseClient";

// LOGIN
export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

// SIGNUP
export const signupUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (data.user) {
    await supabase.from("users").insert({
      id: data.user.id,
      email: data.user.email,
      plan: "free",
      subscription_status: "inactive",
    });
  }

  return { data, error };
};

// LOGOUT
export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

// ADD SCORE
export const addScore = async (userId: string, score: number) => {
  return await supabase.from("scores").insert({
    user_id: userId,
    score,
  });
};

// GET SCORES
export const getScores = async (userId: string) => {
  const { data } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data;
};

// LEADERBOARD
export const getLeaderboard = async () => {
  const { data } = await supabase
    .from("scores")
    .select("user_id, score")
    .order("score", { ascending: false })
    .limit(5);

  return data;
};

// SAVE WINNER
export const saveWinner = async (
  userId: string,
  drawNumbers: number[],
  matchCount: number
) => {
  return await supabase.from("winners").insert({
    user_id: userId,
    draw_numbers: drawNumbers,
    match_count: matchCount,
  });
};

// SUBSCRIPTION UPGRADE
export const upgradeUser = async (userId: string) => {
  return await supabase
    .from("users")
    .update({
      plan: "premium",
      subscription_status: "active",
      expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .eq("id", userId);
};