"use client";

import { supabase } from "../../../lib/supabase";

export default function LogoutButton() {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <button
      onClick={logout}
      className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
    >
      Odhlásit se
    </button>
  );
}