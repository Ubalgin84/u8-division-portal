import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function VysledkyPage() {
  const { data: results } = await supabase
    .from("results")
    .select("*")
    .order("id", { ascending: false });
  const totalRaces = results?.length || 0;

  const totalPoints =
    results?.reduce(
      (sum: number, race: any) =>
        sum + (race.points || 0),
      0
    ) || 0;

  const podiums =
    results?.filter(
      (race: any) =>
        race.finish_pos <= 3
    ).length || 0;

  const wins =
    results?.filter(
      (race: any) =>
        race.finish_pos === 1
    ).length || 0;

  const averageFinish =
    results?.length
      ? (
        results.reduce(
          (sum: number, race: any) =>
            sum + (race.finish_pos || 0),
          0
        ) / results.length
      ).toFixed(1)
      : "-";
  const bestFinish =
    results?.length
      ? Math.min(
        ...results.map(
          (race: any) =>
            race.finish_pos || 999
        )
      )
      : "-";

  const latestRace =
    results?.length
      ? results[0]
      : null;

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/60 min-h-screen">

        <Header />

        <section
          id="vysledky"
          className="max-w-[1900px] mx-auto px-12 pt-48 pb-32"
        >
          <h2 className="text-5xl font-black text-white mb-12 uppercase">
            Výsledky U8 Divisione
          </h2>
          <div className="grid md:grid-cols-6 gap-6 mb-12">

            <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm uppercase">
                Závody
              </p>

              <h3 className="text-4xl font-black text-red-500 mt-2">
                {totalRaces}
              </h3>
            </div>

            <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm uppercase">
                Body
              </p>

              <h3 className="text-4xl font-black text-red-500 mt-2">
                {totalPoints}
              </h3>
            </div>

            <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm uppercase">
                Pódia
              </p>

              <h3 className="text-4xl font-black text-red-500 mt-2">
                {podiums}
              </h3>
            </div>

            <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm uppercase">
                Vítězství
              </p>

              <h3 className="text-4xl font-black text-red-500 mt-2">
                {wins}
              </h3>
            </div>

            <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm uppercase">
                Průměr
              </p>

              <h3 className="text-4xl font-black text-red-500 mt-2">
                P{averageFinish}
              </h3>
            </div>

            <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm uppercase">
                Nejlepší výsledek
              </p>

              <h3 className="text-4xl font-black text-red-500 mt-2">
                P{bestFinish}
              </h3>
            </div>

          </div>

          <div className="overflow-hidden rounded-xl border border-red-900 bg-black/70">

            <table className="w-full">

              <thead className="bg-red-600">
                <tr>
                  <th className="text-left p-5">Datum</th>
                  <th className="text-left p-5">Závod</th>
                  <th className="text-left p-5">Auto</th>
                  <th className="text-center p-5">Start</th>
                  <th className="text-center p-5">Cíl</th>
                  <th className="text-center p-5">Body</th>
                  <th className="text-center p-5">Report</th>
                </tr>
              </thead>

              <tbody>

                {results?.map((race) => (

                  <tr
                    key={race.id}
                    className="border-b border-red-900 hover:bg-red-950/30 transition"
                  >
                    <td className="p-5">
                      {race.race_date
                        ? new Intl.DateTimeFormat("cs-CZ", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        }).format(new Date(race.race_date))
                        : "-"}
                    </td>

                    <td className="p-5 font-bold">
                      {race.race_name}
                    </td>

                    <td className="p-5">
                      {race.car}
                    </td>

                    <td className="text-center">
                      P{race.start_pos}
                    </td>

                    <td
                      className={`text-center font-bold ${race.finish_pos === 1
                        ? "text-yellow-400"
                        : race.finish_pos === 2
                          ? "text-gray-300"
                          : race.finish_pos === 3
                            ? "text-amber-600"
                            : "text-red-500"
                        }`}
                    >
                      P{race.finish_pos}
                    </td>

                    <td className="text-center">
                      {race.points}
                    </td>

                    <td className="text-center">

                      {race.article_slug ? (

                        <a
                          href={`/novinky/${race.article_slug}`}
                          className="text-red-500 hover:text-red-400 font-bold"
                        >
                          📰 Report
                        </a>

                      ) : (

                        <span className="text-gray-500">
                          —
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        <Footer />

      </div>
    </main>
  );
}