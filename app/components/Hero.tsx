import { createClient } from "../../lib/supabase-server";
import NextRaceCard from "./NextRaceCard";

export default async function Hero() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

  const featuredArticle = articles?.[0];

  return (
    <section
      id="domu"
      className="relative h-[calc(100vh-80px)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-8 h-full">

        <div className="h-full flex items-center justify-between gap-20">

          {/* LEVÁ STRANA */}

          <div className="max-w-[700px] flex-1">

            <p className="text-red-500 font-bold tracking-[0.45em] text-sm uppercase mb-6">
              Endurance. Chaos. Comeback.
            </p>

            <h1 className="text-7xl xl:text-8xl font-black leading-none text-white">
              U8 DIVISIONE
            </h1>

            <h2 className="text-6xl xl:text-7xl font-black leading-none text-red-600 mt-3">
              KAŽDÝ ZÁVOD
              <br />
              ZANECHÁ STOPU.
            </h2>

            <p className="text-red-400 uppercase tracking-[0.25em] mt-6 text-sm">
              Výsledky • Reportáže • Fotografie • Soundtracky
            </p>

            <p className="text-xl text-gray-300 mt-8 max-w-xl leading-relaxed">
              Vytváříme příběhy inspirované skutečnými závody U8 Divisione.
              Každý závod se stává součástí historie — od výsledku přes report
              až po vlastní soundtrack.
            </p>

            {featuredArticle && (
              <div className="mt-10 max-w-lg bg-black/80 backdrop-blur-sm border border-red-900 rounded-2xl p-6">

                <p className="text-red-500 uppercase tracking-[0.25em] text-sm mb-4">
                  Poslední reportáž
                </p>

                <p className="text-gray-500 text-xs mb-3">
                  {featuredArticle.race_date}
                </p>

                <h3 className="text-2xl font-black text-white mb-4">
                  {featuredArticle.title}
                </h3>

                <p className="text-gray-400 mb-5 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <a
                  href={`/novinky/${featuredArticle.slug}`}
                  className="inline-flex border border-red-600 rounded-xl px-6 py-3 hover:bg-red-600 transition"
                >
                  Číst reportáž
                </a>

              </div>
            )}

          </div>

          {/* PRAVÁ STRANA */}

          <div className="hidden xl:block w-[420px] flex-shrink-0 mt-186 -translate-x-200">
            <NextRaceCard />
          </div>

        </div>

      </div>

    </section>
  );
}