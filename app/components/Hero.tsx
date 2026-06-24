import { createClient } from "../../lib/supabase-server";
import NextRaceCard from "./NextRaceCard";
import Container from "./Container";

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
      className="relative min-h-[85vh]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <Container className="relative z-10 h-full">

        <div className="min-h-[85vh] flex items-start justify-between gap-10 pt-20">

          {/* LEVÁ STRANA */}

          <div className="max-w-[700px] flex-1">

            <p className="text-red-500 font-bold tracking-[0.45em] text-sm uppercase mb-6">
              Endurance. Chaos. Comeback.
            </p>

            <h1 className="text-5xl xl:text-6xl font-black leading-none text-white">
              U8 DIVISIONE
            </h1>

            <h2 className="text-3xl xl:text-4xl font-black leading-none text-red-600 mt-3">
              KAŽDÝ ZÁVOD
              <br />
              ZANECHÁ STOPU.
            </h2>

            <p className="text-red-400 uppercase tracking-[0.25em] mt-6 text-sm">
              Výsledky • Reportáže • Fotografie • Soundtracky
            </p>

            <p className="text-lg text-gray-300 mt-6 max-w-xl leading-relaxed">
              Vytváříme příběhy inspirované skutečnými závody U8 Divisione.
              Každý závod se stává součástí historie — od výsledku přes report
              až po vlastní soundtrack.
            </p>

            {featuredArticle && (
              <div className="mt-8 max-w-md bg-black/80 backdrop-blur-sm border border-red-900 rounded-2xl p-5">

                <p className="text-red-500 uppercase tracking-[0.25em] text-sm mb-4">
                  Poslední reportáž
                </p>

                <p className="text-gray-500 text-xs mb-3">
                  {featuredArticle.race_date}
                </p>

                <h3 className="text-xl font-black text-white mb-3">
                  {featuredArticle.title}
                </h3>

                <p className="text-gray-400 mb-5 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <a
                  href={`/novinky/${featuredArticle.slug}`}
                  className="inline-flex border border-red-600 rounded-xl px-5 py-2 text-sm hover:bg-red-600 transition"
                >
                  Číst reportáž
                </a>

              </div>
            )}

          </div>

          {/* PRAVÁ STRANA */}

          <div className="hidden xl:block w-[360px] flex-shrink-0">
            <NextRaceCard />
          </div>

        </div>


      </Container>
    </section >
  );
}