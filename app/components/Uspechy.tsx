export default function Uspechy() {
  return (
    <section className="max-w-[1700px] mx-auto px-4 md:px-8 py-16 md:py-24">

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
          ÚSPĚCHY TÝMU
        </h2>

        <p className="text-gray-400 mt-4 text-lg">
          Čísla, která definují U8 Divisione.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

        <div className="border border-red-900 bg-black/70 rounded-xl p-6 md:p-10 text-center min-h-[220px] md:min-h-[260px] hover:border-red-500 hover:scale-105 transition duration-300">
          <div className="text-5xl md:text-8xl font-black text-red-500 mb-4">
            26→2
          </div>

          <h3 className="text-2xl font-bold mb-2">
            COMEBACK ROKU
          </h3>

          <p className="text-gray-400">
            Nürburgring 6H – návrat z P26 na P2.
          </p>
        </div>

        <div className="border border-red-900 bg-black/70 rounded-xl p-6 md:p-10 text-center min-h-[220px] md:min-h-[260px] hover:border-red-500 hover:scale-105 transition duration-300">
          <div className="text-5xl md:text-8xl font-black text-red-500 mb-4">
            18
          </div>

          <h3 className="text-2xl font-bold mb-2">
            BODŮ V SEZÓNĚ
          </h3>

          <p className="text-gray-400">
            Aktuální bodový zisk týmu.
          </p>
        </div>

        <div className="border border-red-900 bg-black/70 rounded-xl p-6 md:p-10 text-center min-h-[220px] md:min-h-[260px] hover:border-red-500 hover:scale-105 transition duration-300">
          <div className="text-5xl md:text-8xl font-black text-red-500 mb-4">
            25
          </div>

          <h3 className="text-2xl font-bold mb-2">
            NEJLEPŠÍ VÝSLEDEK
          </h3>

          <p className="text-gray-400">
            Maximální bodový zisk v závodě.
          </p>
        </div>

        <div className="border border-red-900 bg-black/70 rounded-xl p-6 md:p-10 text-center min-h-[220px] md:min-h-[260px] hover:border-red-500 hover:scale-105 transition duration-300">
          <div className="text-5xl md:text-8xl font-black text-red-500 mb-4">
            3
          </div>

          <h3 className="text-2xl font-bold mb-2">
            AKTIVNÍ JEZDCI
          </h3>

          <p className="text-gray-400">
            Základ týmu U8 Divisione.
          </p>
        </div>

      </div>

    </section>
  );
}