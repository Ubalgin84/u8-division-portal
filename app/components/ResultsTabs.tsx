import Link from "next/link";

type Props = {
  active: "overview" | "stats";
};

export default function ResultsTabs({ active }: Props) {
  return (
    <div className="mt-10 flex justify-center gap-4">

      <Link
        href="/vysledky"
        className={`rounded-xl px-6 py-3 font-semibold transition ${
          active === "overview"
            ? "bg-red-600 border border-red-600"
            : "bg-black/60 border border-red-900 hover:border-red-600"
        }`}
      >
        Přehled
      </Link>

      <Link
        href="/vysledky/statistiky"
        className={`rounded-xl px-6 py-3 font-semibold transition ${
          active === "stats"
            ? "bg-red-600 border border-red-600"
            : "bg-black/60 border border-red-900 hover:border-red-600"
        }`}
      >
        Statistiky
      </Link>

    </div>
  );
}