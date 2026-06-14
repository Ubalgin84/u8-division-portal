import { createClient } from "../../lib/supabase-server";

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
      className="relative h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>

      <div className="relative z-10 max-w-3xl mx-6 md:ml-32">
        <p className="text-red-500 font-bold tracking-widest mb-4">
          ENDURANCE. CHAOS. COMEBACK.
        </p>

        <h1 className="text-5xl md:text-8xl font-black text-white leading-none">
          U8 DIVISIONE
        </h1>

        <h2 className="text-3xl md:text-5xl font-black text-red-600 leading-none mt-2">
          JEDEN TÝM. JEDEN CÍL.
        </h2>
        <p className="text-red-400 uppercase tracking-[0.1em] md:tracking-[0.2em] mt-4 text-sm md:text-base">
          Sim Racing • Endurance • Streaming
        </p>

        <p className="text-base md:text-xl text-gray-300 mt-6 md:mt-8 max-w-xl">
          Závodíme v endurance šampionátech na těch nejtěžších tratích.
          Strategie, týmová práce a vášeň nás ženou vpřed.
        </p>

        <div className="mt-10 max-w-xl bg-black/70 backdrop-blur-sm border border-red-900 rounded-xl p-5">

          {featuredArticle && (
            <>
              <p className="text-gray-500 text-xs mb-2">
                {featuredArticle.race_date}
              </p>

              <h3 className="text-2xl font-black text-white mb-2">
                {featuredArticle.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {featuredArticle.excerpt}
              </p>

              <a
                href={`/novinky/${featuredArticle.slug}`}
                className="inline-block mt-2 border border-red-600 rounded-xl px-8 py-2 hover:bg-red-600 transition"
              >
                Číst reportáž
              </a>

            </>
          )}

        </div>
      </div>
    </section>
  );
}