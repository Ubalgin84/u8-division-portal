export const dynamic = "force-dynamic";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../../lib/supabase";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Link from "next/link";

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
      <div className="min-h-screen bg-black/60">
        <Header />

        <Container size="wide">
          <section className="pt-32 pb-16 text-center">
            <p className="mt-6 text-sm uppercase tracking-[0.4em] text-red-500">
              U8 Divisione News
            </p>

            <h1 className="mt-6 text-6xl xl:text-7xl font-black">
              NOVINKY
            </h1>

            <p className="mt-5 text-lg text-gray-400">
              Reportáže, výsledky a zákulisí týmu U8 Divisione.
            </p>
          </section>

          <section className="pb-24">
            {/* HLAVNÍ REPORTÁŽ */}

            {featuredArticle && (
              <Link
                href={`/novinky/${featuredArticle.slug}`}
                className="mb-16 block"
              >
                <Card
                  padded={false}
                  className="overflow-hidden transition-colors duration-300 hover:border-red-500"
                >
                  {(featuredArticle.featured_image ||
                    featuredArticle.image_url) && (
                      <img
                        src={
                          featuredArticle.featured_image ||
                          featuredArticle.image_url ||
                          "/hero-bg.png"
                        }
                        alt={featuredArticle.title}
                        className="aspect-[16/9] w-full object-cover object-center"
                      />
                    )}

                  <div className="p-10">
                    <p className="mb-2 font-bold uppercase tracking-widest text-red-500">
                      Hlavní reportáž
                    </p>

                    <h2 className="mb-4 text-4xl font-black">
                      {featuredArticle.title}
                    </h2>

                    <p className="mb-4 text-gray-500">
                      {new Date(
                        featuredArticle.created_at
                      ).toLocaleDateString("cs-CZ")}
                    </p>

                    <p className="max-w-3xl text-xl text-gray-300">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            )}

            {/* OSTATNÍ REPORTÁŽE */}

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {otherArticles?.map((article) => (
                <Link
                  key={article.id}
                  href={`/novinky/${article.slug}`}
                  className="group block"
                >
                  <Card
                    padded={false}
                    className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-red-500"
                  >
                    {(article.featured_image || article.image_url) && (
                      <img
                        src={
                          article.featured_image ||
                          article.image_url ||
                          "/hero-bg.png"
                        }
                        alt={article.title}
                        className="aspect-[16/9] w-full object-cover object-center"
                      />
                    )}

                    <div className="p-6">
                      <h3 className="mb-3 text-2xl font-black">
                        {article.title}
                      </h3>

                      <p className="mb-4 text-gray-400">
                        {article.excerpt}
                      </p>

                      <p className="text-xs text-gray-500">
                        {article.track}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </Container>

        <Footer />
      </div>
    </main>
  );
}