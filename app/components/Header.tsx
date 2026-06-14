"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/90 border-b border-red-600 z-50">
      <div className="max-w-[1800px] mx-auto px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex flex-col leading-none">
          <h1 className="text-5xl font-black text-white">
            U8
          </h1>

          <p className="text-red-500 font-bold uppercase tracking-widest">
            DIVISIONE
          </p>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-30 font-semibold uppercase text-white">

          <Link
            href="/"
            className={pathname === "/"
              ? "text-red-500 font-bold"
              : "text-white hover:text-red-500 transition"}
          >
            Domů
          </Link>

          <Link
            href="/novinky"
            className={pathname === "/novinky"
              ? "text-red-500 font-bold"
              : "text-white hover:text-red-500 transition"}
          >
            Novinky
          </Link>

          <Link
            href="/vysledky"
            className={pathname === "/vysledky"
              ? "text-red-500 font-bold"
              : "text-white hover:text-red-500 transition"}
          >
            Výsledky
          </Link>

          <Link
            href="/tym"
            className={pathname === "/tym"
              ? "text-red-500 font-bold"
              : "text-white hover:text-red-500 transition"}
          >
            Tým
          </Link>

          <Link
            href="/media"
            className={pathname === "/media"
              ? "text-red-500 font-bold"
              : "text-white hover:text-red-500 transition"}
          >
            Média
          </Link>

          <Link
            href="/hudba"
            className={pathname === "/hudba"
              ? "text-red-500 font-bold"
              : "text-white hover:text-red-500 transition"}
          >
            Hudba
          </Link>

          <Link
            href="/o-nas"
            className={pathname === "/o-nas"
              ? "text-red-500 font-bold"
              : "text-white hover:text-red-500 transition"}
          >
            O nás
          </Link>

        </nav>

        {/* LIVE STREAM */}
        <div className="flex items-center gap-4">

          <a
            href="https://twitch.tv/Ubalgin_8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 px-5 py-2 rounded font-bold hover:bg-red-700 transition"
          >
            LIVE STREAM
          </a>

          <button
  onClick={() => setMobileMenu(!mobileMenu)}
  className="text-red-500 text-5xl border border-red-500 p-2"
>
  TEST
</button>

        </div>

      </div>
      {mobileMenu && (
        <div className="md:hidden bg-black border-t border-red-600">
          <nav className="flex flex-col gap-4 p-6 uppercase font-semibold text-white">

            <Link href="/" onClick={() => setMobileMenu(false)}>
              Domů
            </Link>

            <Link href="/novinky" onClick={() => setMobileMenu(false)}>
              Novinky
            </Link>

            <Link href="/vysledky" onClick={() => setMobileMenu(false)}>
              Výsledky
            </Link>

            <Link href="/tym" onClick={() => setMobileMenu(false)}>
              Tým
            </Link>

            <Link href="/media" onClick={() => setMobileMenu(false)}>
              Média
            </Link>

            <Link href="/hudba" onClick={() => setMobileMenu(false)}>
              Hudba
            </Link>

            <Link href="/o-nas" onClick={() => setMobileMenu(false)}>
              O nás
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}