import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../../lib/supabase";


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
      <div className="bg-black/40 min-h-screen">

        <Header />
        <div className="h-40"></div>

        <section className="max-w-7xl mx-auto px-6 pt-[200px] pb-24">
          <div className="text-center mb-20">
            <p className="text-red-500 uppercase tracking-[0.3em] mb-4">
              U8 Divisione
            </p>

            <h1 className="text-7xl font-black mb-6">
              TÝM
            </h1>

            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Chaos. Comeback. Endurance.
              Poznej členy U8 Divisione.
            </p>
          </div>

          {/* Členové týmu */}

          <div className="grid md:grid-cols-3 gap-8 mb-20">

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center hover:border-red-500 hover:scale-105 transition-all duration-300">
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
            </div>


            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center hover:border-red-500 hover:scale-105 transition-all duration-300">
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
            </div>

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center hover:border-red-500 hover:scale-105 transition-all duration-300">
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
            </div>

          </div>
          <div className="h-24"></div>

          {/* Statistiky */}

          <div className="text-center mt-32 mb-12">

            <p className="text-red-500 uppercase tracking-[0.3em] mb-4">
              Hall of Fame
            </p>

            <h2 className="text-5xl font-black mb-4">
              ÚSPĚCHY U8 DIVISIONE
            </h2>

            <p className="text-gray-400 text-lg">
              Automaticky generováno z výsledků týmu.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-40">

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center">
              <p className="text-6xl font-black text-red-500">
                {wins}
              </p>

              <p className="text-gray-400 uppercase mt-3">
                Vítězství
              </p>
            </div>

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center">
              <p className="text-6xl font-black text-red-500">
                {totalRaces}
              </p>

              <p className="text-gray-400 uppercase mt-3">
                Závodů
              </p>
            </div>

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center">
              <p className="text-6xl font-black text-red-500">
                {podiums}
              </p>

              <p className="text-gray-400 uppercase mt-3">
                Pódií
              </p>
            </div>

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center">
              <p className="text-6xl font-black text-red-500">
                {totalPoints}
              </p>

              <p className="text-gray-400 uppercase mt-3">
                Celkem bodů
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center">
              <p className="text-6xl font-black text-red-500">
                P{bestFinish}
              </p>

              <p className="text-gray-400 uppercase mt-3">
                Nejlepší výsledek
              </p>
            </div>

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center">
              <p className="text-2xl font-black text-red-500">
                {mostUsedCar}
              </p>

              <p className="text-gray-400 uppercase mt-3">
                Nejpoužívanější vůz
              </p>
            </div>

            <div className="bg-black/90 border border-red-900 rounded-xl p-8 text-center">
              <p className="text-2xl font-black text-red-500">
                {mostUsedTrack}
              </p>

              <p className="text-gray-400 uppercase mt-3">
                Nejoblíbenější trať
              </p>
            </div>

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

        </section>

        <Footer />
      </div>
    </main>
  );
}