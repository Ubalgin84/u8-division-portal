export const dynamic = "force-dynamic";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "@/lib/supabase-server";

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

              {songs.map((song) => (
                <div
                  key={song.id}
                  className="bg-black/80 border border-red-900 rounded-3xl overflow-hidden hover:border-red-500 transition duration-300"
                >

                  {song.cover_image && (
                    <img
                      src={song.cover_image}
                      alt={song.title}
                      className="w-full h-[500px] object-cover"
                    />
                  )}

                  <div className="p-6">

                    <p className="text-red-500 uppercase tracking-[0.25em] text-sm mb-3">
                      U8 Soundtrack
                    </p>

                    <h2 className="text-3xl font-black mb-6">
                      {song.title}
                    </h2>

                    {song.music_file && (
                      <audio
                        controls
                        className="w-full mb-4"
                      >
                        <source
                          src={song.music_file}
                          type="audio/mpeg"
                        />
                        Váš prohlížeč nepodporuje audio přehrávač.
                      </audio>
                    )}

                    {song.youtube_url && (
                      <a
                        href={song.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-red-500 hover:text-red-400 transition"
                      >
                        ▶ Poslechnout na YouTube
                      </a>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

        <Footer />

      </div>
    </main>
  );
}