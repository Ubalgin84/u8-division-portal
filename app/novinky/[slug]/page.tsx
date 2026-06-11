export const dynamic = "force-dynamic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/80 min-h-screen">

        <Header />

        <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">

          <div className="text-center mb-16">

            <p className="text-red-500 uppercase tracking-[0.4em] mb-4">
              U8 DIVISIONE REPORT
            </p>

            <h1 className="text-7xl font-black mb-6">
              {article.title}
            </h1>

            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              {article.excerpt}
            </p>
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full max-w-5xl mx-auto rounded-2xl border border-red-900 mt-12 mb-12 object-cover"
              />
            )}

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">

            <div className="bg-black/50 border border-red-900 rounded-xl p-6 text-center">
              <p className="text-gray-500 uppercase text-sm">Start</p>
              <p className="text-5xl font-black mt-2">
                {article.start_pos}
              </p>
            </div>

            <div className="bg-black/50 border border-red-900 rounded-xl p-6 text-center">
              <p className="text-gray-500 uppercase text-sm">Cíl</p>
              <p className="text-5xl font-black mt-2">
                {article.finish_pos}
              </p>
            </div>

            <div className="bg-black/50 border border-red-900 rounded-xl p-6 text-center">
              <p className="text-gray-500 uppercase text-sm">Body</p>
              <p className="text-5xl font-black mt-2">
                {article.points}
              </p>
            </div>

          </div>
          <div className="grid md:grid-cols-6 gap-6 mb-16">
            <div>
              <p className="text-gray-500 uppercase text-sm">Datum</p>
              <p className="text-xl font-bold">{article.race_date}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-sm">Trať</p>
              <p className="text-xl font-bold">{article.track}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-sm">Vůz</p>
              <p className="text-xl font-bold">{article.car}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-sm">Posádka</p>
              <p className="text-xl font-bold">{article.crew}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-sm">Počasí</p>
              <p className="text-xl font-bold">{article.weather}</p>
            </div>

            <div>
              <p className="text-gray-500 uppercase text-sm">Délka</p>
              <p className="text-xl font-bold">{article.race_length}</p>
            </div>

          </div>

          <div className="bg-black/60 border border-red-900 rounded-2xl p-12 max-w-5xl mx-auto">

            <div className="whitespace-pre-wrap text-xl leading-10 text-gray-200">
              {article.content}
            </div>
            {article.team_reaction && (
              <div className="mt-12 border-t border-red-900 pt-8 max-w-5xl mx-auto">

                <h2 className="text-3xl font-black mb-4">
                  Reakce týmu
                </h2>

                <p className="text-gray-300 text-lg leading-8">
                  {article.team_reaction}
                </p>

              </div>
            )}

          </div>
        </section>

        <Footer />

      </div>
    </main>
  );
}