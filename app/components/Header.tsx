"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/90 border-b border-red-600 z-50">
      <Container className="py-2">
        <div className="flex items-center justify-between">

          {/* Logo */}
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none hover:opacity-80 transition"
          >
            <h1 className="text-4xl font-black text-white">
              U8
            </h1>

            <p className="text-red-500 text-sm font-bold uppercase tracking-widest">
              DIVISIONE
            </p>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex gap-16 text-sm font-semibold uppercase text-white">

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
              href="/zavody"
              className={pathname === "/zavody"
                ? "text-red-500 font-bold"
                : "text-white hover:text-red-500 transition"}
            >
              Závody
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
              className="bg-red-600 px-4 py-1.5 rounded text-sm font-bold hover:bg-red-700 transition"
            >
              LIVE STREAM
            </a>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white text-3xl"
            >
              {mobileMenu ? "✕" : "☰"}
            </button>

          </div>

        </div>
      </Container>
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

            <Link href="/zavody" onClick={() => setMobileMenu(false)}>
              Závody
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