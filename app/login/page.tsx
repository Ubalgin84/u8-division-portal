"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
  console.log("LOGIN START");

  setLoading(true);

  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("SESSION:", result.data.session);

  setLoading(false);

  if (result.error) {
    console.log("LOGIN ERROR:", result.error);
    alert("Nesprávný e-mail nebo heslo.");
    return;
  }

 console.log("LOGIN OK");

router.push("/admin");
router.refresh();
};

return (
  <main
    style={{
      minHeight: "100vh",
      backgroundImage: "url('/hero-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.78)",
      }}
    />

    {/* Red glow */}
    <div
      style={{
        position: "absolute",
        width: "900px",
        height: "900px",
        borderRadius: "50%",
        background: "rgba(220,38,38,0.12)",
        filter: "blur(220px)",
      }}
    />

    {/* Card */}
    <div
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "680px",
        padding: "42px",
        borderRadius: "32px",
        background: "rgba(10,10,10,0.55)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 50px rgba(0,0,0,0.6)",
      }}
    >
      {/* U8 Logo Text */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            fontSize: "84px",
            fontWeight: 900,
            color: "#d1d5db",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          U8
        </div>

        <div
          style={{
            color: "#dc2626",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "10px",
            marginTop: "4px",
          }}
        >
          DIVISIONE
        </div>
      </div>

      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "56px",
          fontWeight: 900,
          marginBottom: "10px",
        }}
      >
        Přihlášení
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#9ca3af",
          fontSize: "16px",
          marginBottom: "40px",
        }}
      >
        Administrační rozhraní U8 Divisione
      </p>

      {/* Email */}
      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            color: "white",
            display: "block",
            marginBottom: "10px",
            fontWeight: 700,
          }}
        >
          E-mail
        </label>

        <input
          type="email"
          placeholder="Zadejte e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            height: "64px",
            padding: "0 20px",
            borderRadius: "14px",
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(220,38,38,0.4)",
            color: "white",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Password */}
      <div style={{ marginBottom: "30px" }}>
        <label
          style={{
            color: "white",
            display: "block",
            marginBottom: "10px",
            fontWeight: 700,
          }}
        >
          Heslo
        </label>

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Zadejte heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              height: "64px",
              padding: "0 20px",
              paddingRight: "60px",
              borderRadius: "14px",
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(220,38,38,0.4)",
              color: "white",
              fontSize: "16px",
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>
      </div>

      {/* Login */}
      <button
        onClick={login}
        disabled={loading}
        style={{
          width: "100%",
          height: "64px",
          borderRadius: "14px",
          background: "#dc2626",
          border: "none",
          color: "white",
          fontSize: "22px",
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 0 30px rgba(220,38,38,0.45)",
        }}
      >
        {loading ? "Přihlašuji..." : "Přihlásit se"}
      </button>

      <div
        style={{
          textAlign: "center",
          color: "#777",
          marginTop: "24px",
          fontSize: "14px",
        }}
      >
        © U8 Divisione
      </div>
    </div>
  </main>
);
}