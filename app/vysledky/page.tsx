import Header from "../components/Header";
import Footer from "../components/Footer";

export default function VysledkyPage() {
  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/40 min-h-screen">
        <Header />
        <section
          id="vysledky"
          className="max-w-[1900px] mx-auto px-12 pt-48 pb-32"
        >
          <h2 className="text-5xl font-black text-white mb-12 uppercase">
            Sezóna 2026
          </h2>

          <div className="overflow-hidden rounded-xl border border-red-900 bg-black/70">

            <table className="w-full">

              <thead className="bg-red-600">
                <tr>
                  <th className="text-left p-5">Trať</th>
                  <th className="text-center p-5">Start</th>
                  <th className="text-center p-5">Cíl</th>
                  <th className="text-center p-5">Body</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b border-red-900 bg-red-950/30">
                  <td className="p-5">Nürburgring 6H</td>
                  <td className="text-center">P26</td>
                  <td className="text-center text-green-500 font-bold">P2</td>
                  <td className="text-center">18</td>
                </tr>

                <tr className="border-b border-red-900">
                  <td className="p-5">Imola 4H</td>
                  <td className="text-center">P6</td>
                  <td className="text-center">P4</td>
                  <td className="text-center">12</td>
                </tr>

                <tr>
                  <td className="p-5">Spa 6H</td>
                  <td className="text-center">P3</td>
                  <td className="text-center text-yellow-400 font-bold">P1</td>
                  <td className="text-center">25</td>
                </tr>

              </tbody>

            </table>

          </div>
        </section>

        <Footer />

      </div>
    </main>
  );
}