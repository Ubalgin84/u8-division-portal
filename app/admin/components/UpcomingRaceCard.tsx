import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function UpcomingRaceCard() {
  const supabase = await createClient();

  const { data: dalsiZavod } = await supabase
    .from("race_calendar")
    .select("*")
    .gt("race_datetime", new Date().toISOString())
    .order("race_datetime", { ascending: true })
    .limit(1)
    .single();

  return (
    <section className="bg-black/70 border border-red-900 rounded-2xl p-6 h-full">

      <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
        Nadcházející závod
      </p>

      {dalsiZavod ? (
        <>
          <div className="flex items-start gap-4 mb-6">

            <div className="border border-red-900 rounded-xl p-4 min-w-[110px] text-center">

              <p className="text-2xl font-black">
                Týden
              </p>

              <p className="text-4xl font-black text-red-500">
                {dalsiZavod.week}
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-black">
                {dalsiZavod.track}
              </h2>

              <p className="text-gray-400">
                {dalsiZavod.series}
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-300">

                <p>
                  📅 {dalsiZavod.race_date}
                </p>

                <p>
                  🕗 {dalsiZavod.race_time}
                </p>

                <p className="text-green-400 uppercase">
                  {dalsiZavod.status}
                </p>

              </div>

            </div>

          </div>
        </>
      ) : (
        <p className="text-gray-500 mb-6">
          Nebyl nalezen žádný nadcházející závod.
        </p>
      )}

      <Link
        href="/admin/kalendar"
        className="inline-flex border border-red-600 px-5 py-3 rounded-xl hover:bg-red-600 transition"
      >
        Zobrazit kalendář
      </Link>

    </section>
  );
}