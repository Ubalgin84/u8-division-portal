import { createClient } from "../../lib/supabase-server";
import Container from "./ui/Container";
import FeaturedArticleCard from "./FeaturedArticleCard";
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
      className="relative min-h-[74vh]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />

      <Container
        size="wide"
        className="relative z-10 pt-24 pb-20"
      >
        {/* HERO TEXT */}

        <div className="max-w-[640px] pt-12">

          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.45em] text-red-500">
            Endurance. Chaos. Comeback.
          </p>

          <h1 className="text-[3rem] font-black leading-none text-white">
            U8 DIVISIONE
          </h1>

          <h2 className="mt-3 text-[2.1rem] font-black leading-tight text-red-600">
            KAŽDÝ ZÁVOD
            <br />
            ZANECHÁ STOPU.
          </h2>

          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-red-400">
            Výsledky • Reportáže • Fotografie • Soundtracky
          </p>

          <p className="mt-5 max-w-[620px] text-base leading-7 text-gray-300">
            Vytváříme příběhy inspirované skutečnými závody U8 Divisione.
            Každý závod se stává součástí historie – od výsledku přes report
            až po vlastní soundtrack.
          </p>

        </div>

        {/* HERO CARDS */}

        <div className="mt-16 mb-20 flex justify-center">

          <div className="grid w-full max-w-[1040px] grid-cols-1 gap-6 xl:grid-cols-2">

            {featuredArticle && (
              <FeaturedArticleCard article={featuredArticle} />
            )}

            <NextRaceCard />

          </div>

        </div>

      </Container>
    </section>
  );
}