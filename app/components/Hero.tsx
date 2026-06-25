import { createClient } from "../../lib/supabase-server";
import NextRaceCard from "./NextRaceCard";
import Container from "./ui/Container";
import FeaturedArticleCard from "./FeaturedArticleCard";

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

      <Container className="relative z-10 flex flex-1">

        <div className="flex w-full items-start justify-between gap-12 pt-20">

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
              <FeaturedArticleCard article={featuredArticle} />
            )}

          </div>

          {/* PRAVÁ STRANA */}

          <div className="hidden xl:block w-full max-w-[360px] flex-shrink-0">
            <NextRaceCard />
          </div>

        </div>


      </Container>
    </section >
  );
}