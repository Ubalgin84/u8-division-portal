import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import { supabase } from "../../lib/supabase";
import PageHero from "../components/ui/PageHero";
import StatCard from "../components/ui/StatCard";
import Section from "../components/ui/Section";
import TableCard from "../components/ui/TableCard";

export const dynamic = "force-dynamic";

export default async function VysledkyPage() {
  const { data: results } = await supabase
    .from("results")
    .select("*")
    .order("id", { ascending: false });

  const totalRaces = results?.length || 0;

  const totalPoints =
    results?.reduce(
      (sum: number, race: any) => sum + (race.points || 0),
      0
    ) || 0;

  const podiums =
    results?.filter(
      (race: any) => race.finish_pos <= 3
    ).length || 0;

  const wins =
    results?.filter(
      (race: any) => race.finish_pos === 1
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
          (race: any) => race.finish_pos || 999
        )
      )
      : "-";

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="min-h-screen bg-black/60">

        <Header />

        <Container size="wide">

          {/* HERO */}

          <PageHero
            eyebrow="U8 Divisione"
            title="VÝSLEDKY"
            description="Přehled všech závodů, získaných bodů a dosažených výsledků."
          />

        
          {/* STATISTIKY */}

          <Section>


            <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6 mb-12">

              <StatCard value={totalRaces} label="Závody" />

              <StatCard value={totalPoints} label="Body" />

              <StatCard value={podiums} label="Pódia" />

              <StatCard value={wins} label="Vítězství" />

              <StatCard value={`P${averageFinish}`} label="Průměr" />

              <StatCard value={`P${bestFinish}`} label="Nejlepší výsledek" />

            </div>


            {/* TABULKA */}

            <TableCard>

              <table className="w-full">

                <thead className="bg-gradient-to-r from-black to-red-950">

                  <tr>

                    <th className="p-5 text-left">Datum</th>
                    <th className="p-5 text-left">Závod</th>
                    <th className="p-5 text-left">Auto</th>
                    <th className="p-5 text-center">Start</th>
                    <th className="p-5 text-center">Cíl</th>
                    <th className="p-5 text-center">Body</th>
                    <th className="p-5 text-center">Report</th>

                  </tr>

                </thead>

                <tbody>

                  {results?.map((race) => (

                    <tr
                      key={race.id}
                      className="border-b border-red-900 transition hover:bg-red-950/30"
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
                            className="font-bold text-red-500 hover:text-red-400"
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

            </TableCard>

          </Section>

        </Container>

        <Footer />

      </div>
    </main >
  );
}