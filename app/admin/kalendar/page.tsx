import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

async function smazatZavod(id: number) {
  "use server";

  const supabase = await createClient();

  await supabase
    .from("race_calendar")
    .delete()
    .eq("id", id);

  redirect("/admin/kalendar");
}

export default async function RaceCalendarPage() {
  const supabase = await createClient();

  const { data: zavody, error } = await supabase
    .from("race_calendar")
    .select("*")
    .order("week", { ascending: true });

  const dalsiZavod = zavody?.find(
    (zavod) => zavod.status === "upcoming"
  );

  return (
    <main className="p-10 text-white">

      {/* HLAVIČKA */}

      <div className="flex justify-between items-center mb-10">

        <div>
          <p className="text-red-500 uppercase tracking-[0.3em] text-sm">
            U8 Divisione
          </p>

          <h1 className="text-5xl font-black mt-2">
            Race Calendar
          </h1>

          <p className="text-gray-500 mt-2">
            Správa závodního kalendáře
          </p>

          <p className="text-yellow-400 mt-2">
            Počet závodů: {zavody?.length ?? 0}
          </p>

        </div>

        <Link
          href="/admin/kalendar/novy"
          className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
        >
          ➕ Přidat závod
        </Link>

      </div>

      {/* DALŠÍ ZÁVOD */}

      <section className="bg-black/70 border border-red-900 rounded-2xl p-8 mb-8">

        <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
          Další závod
        </p>

        {dalsiZavod ? (
          <>
            <h2 className="text-5xl font-black">
              {dalsiZavod.track}
            </h2>

            <p className="text-gray-400 mt-2">
              {dalsiZavod.series}
            </p>

            <div className="flex gap-8 mt-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Datum
                </p>

                <p className="text-2xl font-bold">
                  {dalsiZavod.race_date}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Čas
                </p>

                <p className="text-2xl font-bold">
                  {dalsiZavod.race_time}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Stav
                </p>

                <p className="text-green-400 font-bold uppercase">
                  {dalsiZavod.status}
                </p>
              </div>

            </div>
          </>
        ) : (
          <p className="text-gray-500">
            Nebyl nalezen žádný nadcházející závod.
          </p>
        )}

      </section>

      {/* PŘEHLED SEZÓNY */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-black/70 border border-red-900 rounded-2xl p-6">

          <h3 className="text-2xl font-black mb-4">
            Přehled sezóny
          </h3>

          <p>
            Sezóna: {dalsiZavod?.season ?? "-"}
          </p>

          <p>
            Aktuální týden: {dalsiZavod?.week ?? "-"}
          </p>

          <p>
            Aktuální trať: {dalsiZavod?.track ?? "-"}
          </p>

        </div>

        <div className="bg-black/70 border border-red-900 rounded-2xl p-6">

          <h3 className="text-2xl font-black mb-4">
            Statistiky
          </h3>

          <p>
            Celkem závodů: {zavody?.length ?? 0}
          </p>

          <p>
            Nadcházející:
            {" "}
            {zavody?.filter(
              (zavod) => zavod.status === "upcoming"
            ).length ?? 0}
          </p>

          <p>
            Plánované:
            {" "}
            {zavody?.filter(
              (zavod) => zavod.status === "planned"
            ).length ?? 0}
          </p>

        </div>

      </div>

      {/* TABULKA ZÁVODŮ */}

      <section className="bg-black/70 border border-red-900 rounded-2xl p-6">

        <h3 className="text-2xl font-black mb-6">
          Kalendář závodů
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-red-900 text-left">

                <th className="py-3">
                  Týden
                </th>

                <th>
                  Série
                </th>

                <th>
                  Trať
                </th>

                <th>
                  Datum
                </th>

                <th>
                  Čas
                </th>

                <th>
                  Stav
                </th>

                <th>
                  Akce
                </th>

              </tr>

            </thead>

            <tbody>

              {zavody?.map((zavod) => (
                <tr
                  key={zavod.id}
                  className="border-b border-red-900/30"
                >
                  <td className="py-4">
                    {zavod.week}
                  </td>

                  <td>
                    {zavod.series}
                  </td>

                  <td>
                    {zavod.track}
                  </td>

                  <td>
                    {zavod.race_date}
                  </td>

                  <td>
                    {zavod.race_time}
                  </td>

                  <td className="text-green-400 uppercase">
                    {zavod.status}
                  </td>

                  <td>
                    <div className="flex gap-2">

                      <Link
                        href={`/admin/kalendar/edit/${zavod.id}`}
                        className="border border-yellow-600 px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        ✏️ Upravit
                      </Link>

                      <form action={smazatZavod.bind(null, zavod.id)}>
                        <button
                          type="submit"
                          className="border border-red-600 px-3 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                          🗑️ Smazat
                        </button>
                      </form>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}