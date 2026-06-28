import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../../lib/supabase";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import InfoCard from "../components/ui/InfoCard";
import SectionTitle from "../components/ui/SectionTitle";
import StatCard from "../components/ui/StatCard";


export default async function TymPage() {

  const { data: results } = await supabase
    .from("results")
    .select("*");

  const totalRaces = results?.length || 0;

  const podiums =
    results?.filter(
      (race: any) => race.finish_pos <= 3
    ).length || 0;

  const wins =
    results?.filter(
      (race: any) => race.finish_pos === 1
    ).length || 0;

  const totalPoints =
    results?.reduce(
      (sum: number, race: any) =>
        sum + (race.points || 0),
      0
    ) || 0;

  const bestFinish =
    results?.length
      ? Math.min(
        ...results.map(
          (race: any) =>
            race.finish_pos || 999
        )
      )
      : "-";

  const mostUsedCar =
    results?.length
      ? Object.entries(
        results.reduce(
          (acc: any, race: any) => {
            acc[race.car] =
              (acc[race.car] || 0) + 1;
            return acc;
          },
          {}
        )
      ).sort(
        (a: any, b: any) =>
          Number(b[1]) - Number(a[1])
      )[0]?.[0] || "-"
      : "-";

  const mostUsedTrack =
    results?.length
      ? Object.entries(
        results.reduce(
          (acc: any, race: any) => {
            acc[race.track] =
              (acc[race.track] || 0) + 1;
            return acc;
          },
          {}
        )
      ).sort(
        (a: any, b: any) =>
          Number(b[1]) - Number(a[1])
      )[0]?.[0] || "-"
      : "-";

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/60 min-h-screen">

        <Header />
        <Container size="wide">

          <PageHero
            eyebrow="U8 Divisione"
            title="TÝM"
            description="Chaos. Comeback. Endurance. Poznej členy U8 Divisione."
          />

          {/* Členové týmu */}

          <div className="grid md:grid-cols-3 gap-8 mb-20">

            <InfoCard className="text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-500">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-red-500 flex items-center justify-center text-5xl font-black mb-6">
                RD
              </div>

              <h2 className="text-2xl font-black">
                <p>Radim Daněk</p>
                <p>Ubalgin_8</p>
              </h2>

              <p className="text-red-500 mt-2">
                Zakladatel | Jezdec
              </p>

              <div className="mt-6 text-gray-300 space-y-2">
                <p>iRating: 1800</p>
                <p>Oblíbená trať: Nürburgring</p>
                <p>GT3 Endurance</p>
              </div>
            </InfoCard>


            <InfoCard className="text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-500">
              <img
                src="/U8.jpg"
                alt="Ubalgin_8"
                className="w-32 h-32 mx-auto rounded-full border-2 border-red-500 object-cover mb-6"
              />

              <h2 className="text-2xl font-black">
                <p>Ubalgin_8</p>
                <p>Radim Daněk</p>
              </h2>

              <p className="text-red-500 mt-2">
                Zakladatel | Streamer
              </p>

              <div className="mt-6 text-gray-300 space-y-2">
                <p>Vedoucí týmu</p>
                <p>Twitch & YouTube</p>
              </div>
            </InfoCard>

            <InfoCard className="text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-500">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-red-500 flex items-center justify-center text-5xl font-black mb-6">
                MK
              </div>

              <h2 className="text-2xl font-black">
                <p>Michal Kovarzhig</p>
                <p>TTR Jaguar</p>
              </h2>

              <p className="text-red-500 mt-2">
                Endurance Jezdec
              </p>

              <div className="mt-6 text-gray-300 space-y-2">
                <p>Vytrvalostní závody</p>
                <p>Týmový jezdec</p>
              </div>
            </InfoCard>

          </div>
          <div className="h-24"></div>

          {/* Statistiky */}

          <SectionTitle
            subtitle="Hall of Fame"
            centered
          >
            ÚSPĚCHY U8 DIVISIONE
          </SectionTitle>

          <p className="mb-12 text-center text-lg text-gray-400">
            Automaticky generováno z výsledků týmu.
          </p>

          <div className="grid gap-6 md:grid-cols-4 mt-40">

            <StatCard
              value={wins}
              label="Vítězství"
            />

            <StatCard
              value={totalRaces}
              label="Závodů"
            />

            <StatCard
              value={podiums}
              label="Pódií"
            />

            <StatCard
              value={totalPoints}
              label="Celkem bodů"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-8">

            <StatCard
              value={`P${bestFinish}`}
              label="Nejlepší výsledek"
            />

            <StatCard
              value={mostUsedCar}
              label="Nejpoužívanější vůz"
            />

            <StatCard
              value={mostUsedTrack}
              label="Nejoblíbenější trať"
            />

          </div>

          <div className="max-w-5xl mx-auto mt-32 bg-black/90 border border-red-900 rounded-xl p-12 text-center">

            <h2 className="text-5xl font-black mb-8 text-white">
              O U8 Divisione
            </h2>

            <p className="text-xl text-gray-200 leading-10 max-w-3xl mx-auto">
              U8 Divisione je český simracing tým zaměřený na GT3
              a vytrvalostní závody v iRacingu.
              <br /><br />
              Naší filozofií je konzistence, strategie a schopnost
              vrátit se do boje i v těch nejtěžších situacích.
              <br /><br />
              <span className="text-red-500 font-bold">
                Chaos. Comeback. Endurance.
              </span>
            </p>

            <h2 className="text-5xl font-black mb-6 text-white">
              Přidej se k nám
            </h2>

            <p className="text-xl text-gray-200 mb-10">
              Hledáme aktivní jezdce pro GT3,
              endurance speciály a týmové závody.
            </p>

            <a
              href="https://discord.gg/TVUJDISCORD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition duration-300"
            >
              DISCORD
            </a>

          </div>

        </Container>

        <Footer />
      </div>
    </main>
  );
}