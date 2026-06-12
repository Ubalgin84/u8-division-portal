import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { count } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("id", { ascending: false })
    .limit(5);

  const latestArticle = articles?.[0];

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="min-h-screen bg-black/90 text-white flex">

        {/* SIDEBAR */}

        <aside className="w-80 border-r border-red-900 bg-black/80 backdrop-blur-md">

          <div className="p-8 border-b border-red-900">

            <Image
              src="/u8-logo.png"
              alt="U8 Divisione"
              width={220}
              height={110}
              priority
            />

            <p className="text-red-500 uppercase tracking-[0.4em] text-sm mt-6">
              Control Center
            </p>

          </div>

          <nav className="p-6 space-y-4">

            <Link
              href="/admin"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/clanky"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              📚 Správa článků
            </Link>

            <Link
              href="/admin/novy-clanek"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              📰 Nový článek
            </Link>

            <div className="border border-red-900 rounded-xl p-4 text-gray-400">
              🖼 Média
            </div>

            <div className="border border-red-900 rounded-xl p-4 text-gray-400">
              🤖 AI Report
            </div>

          </nav>

        </aside>

        {/* CONTENT */}

        <div className="flex-1">

          <div className="border-b border-red-900 px-10 py-8 flex justify-between items-center">

            <div>

              <p className="text-red-500 uppercase tracking-[0.4em] text-sm">
                U8 Divisione
              </p>

              <h1 className="text-6xl font-black">
                CONTROL CENTER
              </h1>

            </div>

            <a
              href="/"
              target="_blank"
              className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
            >
              Otevřít web
            </a>

          </div>

          <div className="p-10">

            {/* STATISTIKY */}

            <div className="grid md:grid-cols-4 gap-6 mb-10">

              <div className="bg-black/70 border border-red-900 rounded-2xl p-8">
                <p className="text-gray-400 uppercase text-sm">
                  Reporty
                </p>

                <h2 className="text-7xl font-black text-red-500 mt-2">
                  {count ?? 0}
                </h2>
              </div>

              <div className="bg-black/70 border border-red-900 rounded-2xl p-8">
                <p className="text-gray-400 uppercase text-sm">
                  Poslední závod
                </p>

                <h2 className="text-3xl font-black mt-2">
                  {latestArticle?.track ?? "-"}
                </h2>
              </div>

              <div className="bg-black/70 border border-red-900 rounded-2xl p-8">
                <p className="text-gray-400 uppercase text-sm">
                  Nejlepší výsledek
                </p>

                <h2 className="text-5xl font-black text-red-500 mt-2">
                  P2
                </h2>
              </div>

              <div className="bg-black/70 border border-red-900 rounded-2xl p-8">
                <p className="text-gray-400 uppercase text-sm">
                  Aktivní jezdci
                </p>

                <h2 className="text-5xl font-black text-red-500 mt-2">
                  3
                </h2>
              </div>

            </div>

            {/* POSLEDNÍ REPORT */}

            {latestArticle && (

              <div className="bg-black/70 border border-red-900 rounded-2xl p-10 mb-10">

                <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
                  Poslední report
                </p>

                <h2 className="text-4xl font-black mb-4">
                  {latestArticle.title}
                </h2>

                <p className="text-gray-300 text-lg">
                  {latestArticle.excerpt}
                </p>

              </div>

            )}

            {/* POSLEDNÍ ČLÁNKY */}

            <div className="bg-black/70 border border-red-900 rounded-2xl p-8 mb-10">

              <h2 className="text-3xl font-black mb-8">
                Poslední reporty
              </h2>

              <div className="space-y-4">

                {articles?.map((article) => (

                  <div
                    key={article.id}
                    className="border border-red-900 rounded-xl p-5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold text-lg">
                        {article.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {article.track}
                      </p>
                    </div>

                    <div className="flex gap-2">

                      <a
                        href={`/novinky/${article.slug}`}
                        target="_blank"
                        className="border border-green-600 px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Otevřít
                      </a>

                      <a
                        href={`/admin/edit/${article.id}`}
                        className="border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Upravit
                      </a>

                      <button
                        className="border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Smazat
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* AKCE */}

            <div className="grid md:grid-cols-3 gap-6">

              <Link
                href="/admin/novy-clanek"
                className="bg-black/70 border border-red-900 rounded-2xl p-8 hover:border-red-500 transition"
              >
                📰 Nový článek
              </Link>

              <div className="bg-black/70 border border-red-900 rounded-2xl p-8">
                🤖 AI Report
              </div>

              <a
                href="/"
                target="_blank"
                className="bg-black/70 border border-red-900 rounded-2xl p-8"
              >
                🌐 Zobrazit web
              </a>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}