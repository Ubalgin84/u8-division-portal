"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./ui/Container";

const navigation = [
  { href: "/", label: "Domů" },
  { href: "/novinky", label: "Novinky" },

  {
    href: "/vysledky",
    label: "Výsledky",
    children: [
      { href: "/vysledky", label: "Přehled" },
      { href: "/vysledky/statistiky", label: "Statistiky" },
      { href: "/vysledky/rekordy", label: "Rekordy" },
    ],
  },

  { href: "/tym", label: "Tým" },
  { href: "/zavody", label: "Závody" },
  { href: "/hudba", label: "Hudba" },
  { href: "/o-nas", label: "O nás" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-red-700 bg-black/90 backdrop-blur-md">
      <Container className="h-16">
        <div className="flex h-full items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex flex-col leading-none transition-opacity hover:opacity-80"
          >
            <h1 className="text-3xl font-black leading-none text-white">
              U8
            </h1>

            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-red-500">
              DIVISIONE
            </p>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-10 text-[13px] font-semibold uppercase md:flex">

            {navigation.map((item) => {

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="group relative"
                  >
                    <Link
                      href={item.href}
                      className={
                        pathname.startsWith("/vysledky")
                          ? "text-red-500"
                          : "text-white transition-colors duration-300 hover:text-red-500"
                      }
                    >
                      <span className="flex items-center gap-1">
                        {item.label}
                        <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">
                          ▼
                        </span>
                      </span>
                    </Link>

                    <div className="absolute left-1/2 top-full hidden w-52 -translate-x-1/2 pt-4 group-hover:block">

                      <div className="rounded-2xl border border-red-900 bg-black/95 backdrop-blur-md overflow-hidden">

                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-5 py-3 text-sm normal-case transition hover:bg-red-950/60 ${pathname === child.href
                              ? "text-red-500"
                              : "text-white"
                              }`}
                          >
                            {child.label}
                          </Link>
                        ))}

                      </div>

                    </div>

                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "text-red-500"
                      : "text-white transition-colors duration-300 hover:text-red-500"
                  }
                >
                  {item.label}
                </Link>
              );
            })}

          </nav>

          {/* Right */}

          <div className="flex items-center gap-3">

            <a
              href="https://twitch.tv/Ubalgin_8"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 hover:bg-red-700"
            >
              LIVE STREAM
            </a>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-xl text-white md:hidden"
            >
              {mobileMenu ? "✕" : "☰"}
            </button>

          </div>

        </div>
      </Container>

      {mobileMenu && (
        <div className="border-t border-red-700 bg-black/95 backdrop-blur-md md:hidden">

          <nav className="flex flex-col gap-5 p-6 text-sm font-semibold uppercase text-white">

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className={
                  pathname === item.href
                    ? "text-red-500"
                    : "transition-colors duration-300 hover:text-red-500"
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