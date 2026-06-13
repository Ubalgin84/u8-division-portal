import Image from "next/image";

type Props = {
  raceName: string;
  track: string;
  car: string;
  startPos: number;
  finishPos: number;
  points: number;
  crew: string;
  raceDate: string;
};

export default function U8RaceCover({
  raceName,
  track,
  car,
  startPos,
  finishPos,
  points,
  crew,
  raceDate,
}: Props) {
  const gainedPositions = startPos - finishPos;

  return (
    <div className="rounded-3xl overflow-hidden border border-red-900 bg-black text-white">

      {/* HEADER */}
      <div className="border-b border-red-900 bg-black/95 px-8 py-5">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-black tracking-wide">
              U8 DIVISIONE
            </h1>

            <p className="text-red-500 uppercase tracking-[0.4em] text-xs">
              Race Report
            </p>
          </div>

          <div className="text-right">
            <p className="text-red-500 uppercase text-xs">
              Global Endurance Tour
            </p>

            <p className="text-gray-400 text-sm">
              2026 Sezóna 2
            </p>
          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-12 min-h-[600px]">

        {/* LEVÝ PANEL */}
        <div className="lg:col-span-2 border-r border-red-900 bg-black/80 p-6">

          <h2 className="text-4xl font-black uppercase">
            {track}
          </h2>

          <p className="mt-2 text-gray-400 text-sm">
            {raceDate}
          </p>

          <div className="mt-8 space-y-6">

            <div>
              <p className="text-gray-500 uppercase text-xs">
                Cílová pozice
              </p>

              <p className="text-6xl font-black text-red-500">
                P{finishPos}
              </p>
            </div>

            <div>
              <p className="text-gray-500 uppercase text-xs">
                Startovní pozice
              </p>

              <p className="text-4xl font-black">
                P{startPos}
              </p>
            </div>

            <div>
              <p className="text-gray-500 uppercase text-xs">
                Body
              </p>

              <p className="text-4xl font-black">
                {points}
              </p>
            </div>

            <div>
              <p className="text-gray-500 uppercase text-xs">
                Získané pozice
              </p>

              <p className="text-4xl font-black text-green-500">
                +{gainedPositions}
              </p>
            </div>

          </div>

        </div>

        {/* STŘED */}
        <div
          className="relative lg:col-span-10 flex flex-col justify-center items-center overflow-hidden"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Glow */}
          <div className="absolute w-[500px] h-[250px] bg-red-600/20 blur-[120px] rounded-full" />

          {/* Hexagony */}
          <div
            className="absolute right-0 top-0 h-full w-1/3 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "35px 35px",
            }}
          />

          <div className="relative z-10 text-center px-8">

            <p className="text-red-500 uppercase tracking-[0.4em] text-sm mb-4">
              U8 STEALTH DIVISION
            </p>

            <Image
              src="/ferrari-296.png"
              alt={car}
              width={1200}
              height={600}
              className="object-contain w-full max-w-[900px] mx-auto"
              priority
            />

            <h2 className="text-4xl font-black mt-4">
              {raceName}
            </h2>

            <p className="text-gray-400 mt-2">
              {car}
            </p>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t border-red-900 bg-black/95">

        <div className="grid md:grid-cols-4 gap-6 px-8 py-5">

          <div>
            <p className="text-gray-500 uppercase text-xs">
              Vůz
            </p>

            <p className="font-bold">
              {car}
            </p>
          </div>

          <div>
            <p className="text-gray-500 uppercase text-xs">
              Trať
            </p>

            <p className="font-bold">
              {track}
            </p>
          </div>

          <div>
            <p className="text-gray-500 uppercase text-xs">
              Posádka
            </p>

            <p className="font-bold">
              {crew}
            </p>
          </div>

          <div>
            <p className="text-gray-500 uppercase text-xs">
              U8 Divisione
            </p>

            <p className="font-bold text-red-500">
              Official Race Report
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}