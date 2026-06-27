import { createClient } from "@/lib/supabase-server";
import Countdown from "./Countdown";
import Card from "./ui/Card";
import Button from "./ui/Button";

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
    <Card className="h-full flex flex-col p-6">

      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-red-500">
        Další závod
      </p>

      <h2 className="text-2xl font-black leading-tight text-white">
        {dalsiZavod.track}
      </h2>

      <p className="mt-2 text-gray-400">
        {dalsiZavod.series}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-6">

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Datum
          </p>

          <p className="mt-1 font-semibold text-white">
            {dalsiZavod.race_date}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Čas
          </p>

          <p className="mt-1 font-semibold text-white">
            {dalsiZavod.race_time}
          </p>
        </div>

      </div>

      <div className="mt-6 border-t border-red-900 pt-5 flex-1">

        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
          Start za
        </p>

        <Countdown raceDatetime={dalsiZavod.race_datetime} />

      </div>

      <div className="mt-8">
        <Button href="/zavody">
          Zobrazit kalendář
        </Button>
      </div>

    </Card>
  );
}