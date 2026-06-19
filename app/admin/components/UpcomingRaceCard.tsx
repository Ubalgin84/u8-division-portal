import Link from "next/link";

export default function UpcomingRaceCard() {
  return (
    <section className="bg-black/70 border border-red-900 rounded-2xl p-6 h-full">

      <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
        Nadcházející závod
      </p>

      <div className="flex items-start gap-4 mb-6">

        <div className="border border-red-900 rounded-xl p-4 min-w-[90px] text-center">
          <p className="text-4xl font-black">
            18
          </p>

          <p className="text-gray-400 text-sm uppercase">
            Kvě
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-black">
            Monza
          </h2>

          <p className="text-gray-400">
            Endurance Series
          </p>

          <div className="mt-4 space-y-1 text-sm text-gray-300">
            <p>🕗 20:00</p>
            <p>📍 Monza, Italy</p>
          </div>
        </div>

      </div>

      <Link
        href="/admin/kalendar"
        className="inline-flex border border-red-600 px-5 py-3 rounded-xl hover:bg-red-600 transition"
      >
        Zobrazit kalendář
      </Link>

    </section>
  );
}