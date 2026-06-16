export const dynamic = "force-dynamic";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "@/lib/supabase-server";
import U8MusicLibrary from "../components/U8MusicLibrary";

export default async function HudbaPage() {
  const supabase = await createClient();

  const { data: songs } = await supabase
    .from("songs")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/70 min-h-screen">

        <Header />

        <section className="max-w-7xl mx-auto px-6 py-32">

          <div className="text-center mb-16">

            <h1 className="text-6xl md:text-7xl font-black uppercase mb-6">
              U8 Songs
            </h1>

            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Oficiální hudební knihovna U8 Divisione.
              Originální soundtracky vytvořené pro závodní příběhy,
              emoce a okamžiky našeho týmu.
            </p>

          </div>

          {!songs?.length ? (
            <div className="border border-red-900 rounded-2xl p-12 bg-black/70 text-center">

              <h2 className="text-4xl font-black mb-4">
                Žádné skladby
              </h2>

              <p className="text-gray-400">
                Hudební knihovna je zatím prázdná.
              </p>

            </div>
          ) : (
            <U8MusicLibrary songs={songs || []} />
          )}

        </section>

        <Footer />

      </div>
    </main>
  );
}