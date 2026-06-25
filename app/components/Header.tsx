"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";

const navigation = [
  { href: "/", label: "Domů" },
  { href: "/novinky", label: "Novinky" },
  { href: "/vysledky", label: "Výsledky" },
  { href: "/tym", label: "Tým" },
  { href: "/zavody", label: "Závody" },
  { href: "/hudba", label: "Hudba" },
  { href: "/o-nas", label: "O nás" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 w-full bg-black/90 border-b border-red-600 z-50">
      <Container className="h-20">
        <div className="flex items-center justify-between h-full">

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
          <nav className="hidden md:flex gap-12 text-sm font-semibold uppercase text-white">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(item.href)
                    ? "text-red-500 font-bold"
                    : "text-white hover:text-red-500 transition-colors duration-300"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* LIVE STREAM */}
          <div className="flex items-center gap-4">

            <Button
              href="https://twitch.tv/Ubalgin_8"
              external
              className="bg-red-600 border-red-600 hover:bg-red-700"
            >
              LIVE STREAM
            </Button>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white text-2xl"
            >
              {mobileMenu ? "✕" : "☰"}
            </button>

          </div>

        </div>
      </Container>
      {mobileMenu && (
        <div className="md:hidden bg-black border-t border-red-600">
          <nav className="flex flex-col gap-4 p-6 uppercase font-semibold text-white">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className={
                  pathname === item.href
                    ? "text-red-500"
                    : "hover:text-red-500 transition-colors duration-300"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}