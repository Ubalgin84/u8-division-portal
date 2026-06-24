import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import Countdown from "./Countdown";

export default async function NextRaceCard() {
  const supabase = await createClient();

  const { data: dalsiZavod } = await supabase
    .from("race_calendar")
    .select("*")
    .gt("race_datetime", new Date().toISOString())
    .order("race_datetime", { ascending: true })
    .limit(1)
    .single();

  if (!dalsiZavod) return null;

  return (
    <section className="bg-black/90 backdrop-blur-sm border border-red-900 rounded-2xl p-4">

      <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
        Další závod
      </p>

      <h2 className="text-3xl font-black leading-tight">
        {dalsiZavod.track}
      </h2>

      <p className="text-gray-400 mt-2">
        {dalsiZavod.series}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div>
          <p className="text-gray-500 text-sm">
            Datum
          </p>

          <p className="font-bold">
            {dalsiZavod.race_date}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Čas
          </p>

          <p className="font-bold">
            {dalsiZavod.race_time}
          </p>
        </div>

      </div>

      <div className="mt-6 border-t border-red-900 pt-4">

        <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-2">
          Start za
        </p>

        <Countdown
          raceDatetime={dalsiZavod.race_datetime}
        />

      </div>

      <Link
        href="/zavody"
        className="inline-flex mt-6 border border-red-600 px-4 py-2 text-sm rounded-xl hover:bg-red-600 transition"
      >
        Zobrazit kalendář
      </Link>

    </section>
  );
}