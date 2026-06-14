import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HudbaPage() {
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
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-black text-white uppercase">
              Soundtrack U8
            </h2>

            <a
              href="#"
              className="text-red-500 hover:text-red-400 transition"
            >
              Zobrazit vše →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-black/70 border border-red-900 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 transition duration-300">
              <img
                src="/song/song-1.jpg"
                alt="Road Atlanta Ocel"
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <p className="text-red-500 uppercase text-sm mb-2">
                  Soundtrack
                </p>

                <h3 className="text-2xl font-bold mb-3">
                  ROAD ATLANTA OCEL
                </h3>

                <p className="text-gray-400 mb-6">
                  Příběh vytrvalosti, boje a týmového ducha U8 Divisione.
                </p>

                <button className="border border-white px-5 py-2 hover:bg-red-600 hover:border-red-600 transition">
                  Poslechnout
                </button>
              </div>
            </div>

            <div className="bg-black/70 border border-red-900 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 transition duration-300">
              <img
                src="/song/song-2.jpg"
                alt="Nürburgring 6H"
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <p className="text-red-500 uppercase text-sm mb-2">
                  Soundtrack
                </p>

                <h3 className="text-2xl font-bold mb-3">
                  NÜRBURGRING 6H
                </h3>

                <p className="text-gray-400 mb-6">
                  Chaos, comeback a cesta z P26 na fantastické P2.
                </p>

                <button className="border border-white px-5 py-2 hover:bg-red-600 hover:border-red-600 transition">
                  Poslechnout
                </button>
              </div>
            </div>

            <div className="bg-black/70 border border-red-900 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 transition duration-300">
              <img
                src="/song/song-3.jpg"
                alt="U8 Anthem"
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <p className="text-red-500 uppercase text-sm mb-2">
                  Soundtrack
                </p>

                <h3 className="text-2xl font-bold mb-3">
                  U8 DIVISIONE ANTHEM
                </h3>

                <p className="text-gray-400 mb-6">
                  Oficiální hudební identita týmu U8 Divisione.
                </p>

                <button className="border border-white px-5 py-2 hover:bg-red-600 hover:border-red-600 transition">
                  Poslechnout
                </button>
              </div>
            </div>

          </div>
        </section>

        <Footer />

      </div>
    </main>
  );
}