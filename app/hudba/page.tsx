export const dynamic = "force-dynamic";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function HudbaPage() {
  const supabase = await createClient();

  const { data: tracks } = await supabase
    .from("articles")
    .select("*")
    .not("music_title", "is", null)
    .order("id", { ascending: false });

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/60 min-h-screen">

        <Header />

        <section
          id="hudba"
          className="max-w-7xl mx-auto px-6 py-32"
        >
          <div className="mb-12">

            <h1 className="text-5xl font-black text-white uppercase mb-4">
              🎵 Soundtrack U8
            </h1>

            <p className="text-gray-400 text-lg">
              Hudba použitá v závodních reportech U8 Divisione.
            </p>

          </div>

          {!tracks?.length ? (
            <div className="border border-red-900 rounded-2xl p-10 text-center bg-black/70">
              <h2 className="text-3xl font-black mb-4">
                Zatím žádné soundtracky
              </h2>

              <p className="text-gray-400">
                Publikuj první článek se soundtrackem a zobrazí se zde.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-black/70 border border-red-900 rounded-2xl overflow-hidden hover:border-red-500 transition"
                >

                  {track.featured_image && (
                    <img
                      src={track.featured_image}
                      alt={track.music_title || track.title}
                      className="w-full h-72 object-cover"
                    />
                  )}

                  <div className="p-6">

                    <p className="text-red-500 uppercase text-sm mb-2">
                      Soundtrack
                    </p>

                    <h3 className="text-2xl font-black mb-3">
                      {track.music_title || "Bez názvu"}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      {track.title}
                    </p>

                    {track.track && (
                      <p className="text-sm text-gray-500 mb-4">
                        🏁 {track.track}
                      </p>
                    )}

                    {track.music_file && (
                      <audio
                        controls
                        className="w-full mb-4"
                      >
                        <source
                          src={track.music_file}
                          type="audio/mpeg"
                        />
                        Váš prohlížeč nepodporuje audio přehrávač.
                      </audio>
                    )}

                    {track.music_url && (
                      <a
                        href={track.music_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-red-500 hover:text-red-400 mb-4"
                      >
                        ▶ Poslechnout externí verzi
                      </a>
                    )}

                    <Link
                      href={`/articles/${track.slug}`}
                      className="inline-block border border-white px-5 py-2 hover:bg-red-600 hover:border-red-600 transition"
                    >
                      Otevřít report
                    </Link>

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