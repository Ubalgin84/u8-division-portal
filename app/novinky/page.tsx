
export const dynamic = "force-dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../../lib/supabase";

export default async function NovinkyPage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("id", { ascending: false });
  const featuredArticle = articles?.[0] ?? null;
  const otherArticles = articles?.slice(1) ?? [];

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/40 min-h-screen">
        <Header />

        <section className="pt-32 pb-20 text-center">

          <p className="text-red-500 uppercase tracking-[0.4em] text-sm mt-6">
            U8 Divisione News
          </p>

          <h1 className="text-7xl font-black mt-6">
            NOVINKY
          </h1>

          <p className="text-gray-400 mt-6 mb-8">
            Reportáže, výsledky a zákulisí týmu U8 Divisione.
          </p>


        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">

          {/* HLAVNÍ REPORTÁŽ */}

          {featuredArticle && (
            <a
              href={`/novinky/${featuredArticle.slug}`}
              className="block mb-16"
            >
              <article className="border border-red-900 bg-black/70 rounded-xl overflow-hidden hover:border-red-500 transition duration-300">

                {(featuredArticle.featured_image || featuredArticle.image_url) && (
                  <img
                    src={
                      featuredArticle.featured_image ||
                      featuredArticle.image_url ||
                      "/hero-bg.png"
                    }
                    alt={featuredArticle.title}
                    className="w-full h-[400px] object-cover"
                  />
                )}

                <div className="p-10">

                  <p className="text-red-500 uppercase font-bold tracking-widest mb-2">
                    Hlavní reportáž
                  </p>

                  <h2 className="text-4xl font-black mb-4">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-gray-500 mb-4">
                    {new Date(featuredArticle.created_at).toLocaleDateString("cs-CZ")}
                  </p>

                  <p className="text-xl text-gray-300 max-w-3xl">
                    {featuredArticle.excerpt}
                  </p>

                </div>

              </article>
            </a>
          )}

          {/* OSTATNÍ REPORTÁŽE */}

          <div className="grid md:grid-cols-3 gap-8 mt-10">

            {otherArticles?.map((article) => (

              <a
                key={article.id}
                href={`/novinky/${article.slug}`}
                className="block group"
              >
                <article className="border border-red-900 bg-black/70 rounded-xl overflow-hidden hover:border-red-500 hover:scale-[1.02] transition duration-300">
                  {(article.featured_image || article.image_url) && (
                    <img
                      src={article.image_url || "/hero-bg.png"}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                  )}

                  <div className="p-6">

                    <h3 className="text-2xl font-black mb-3">
                      {article.title}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      {article.excerpt}
                    </p>

                    <p className="text-gray-500 text-xs">
                      {article.track}
                    </p>

                  </div>

                </article>
              </a>

            ))}

          </div>

        </section>
        <Footer />
      </div>
    </main>
  );
}