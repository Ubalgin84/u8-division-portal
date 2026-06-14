import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MediaPage() {
  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/60 min-h-screen">

        <Header />

        <section className="max-w-[1700px] mx-auto px-8 py-32">

          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-black text-white uppercase">
              MÉDIA
            </h2>

            <a
              href="#"
              className="text-red-500 hover:text-red-400 transition"
            >
              Zobrazit vše →
            </a>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            <div className="border border-red-900 bg-black/70 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 transition duration-300">
              <img
                src="/media/media-1.jpg"
                alt="Highlight"
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-center">
                <p className="text-gray-300">
                  Nejlepší momenty šestihodinového závodu.
                </p>
              </div>
            </div>

            <div className="border border-red-900 bg-black/70 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 transition duration-300">
              <img
                src="/media/media-2.jpg"
                alt="Onboard"
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-center">
                <p className="text-gray-300">
                  Napínavý souboj o druhé místo.
                </p>
              </div>
            </div>

            <div className="border border-red-900 bg-black/70 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 transition duration-300">
              <img
                src="/media/media-3.jpg"
                alt="Team"
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-center">
                <p className="text-gray-300">
                  Komunikace během kritických momentů závodu.
                </p>
              </div>
            </div>

            <div className="border border-red-900 bg-black/70 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 transition duration-300">
              <img
                src="/media/media-4.jpg"
                alt="Galerie"
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-center">
                <p className="text-gray-300">
                  Výběr nejlepších fotografií týmu U8.
                </p>
              </div>
            </div>

          </div>
        </section>

        <Footer />

      </div>
    </main>
  );
}