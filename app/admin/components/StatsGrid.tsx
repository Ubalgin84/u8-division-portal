interface StatsGridProps {
  articleCount: number;
  totalRaces: number;
  totalPoints: number;
  bestFinish: number | string;
}

export default function StatsGrid({
  articleCount,
  totalRaces,
  totalPoints,
  bestFinish,
}: StatsGridProps) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

      <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
        <p className="text-gray-400 uppercase text-xs mb-2">
          📄 Reporty
        </p>

        <h2 className="text-5xl font-black text-white">
          {articleCount}
        </h2>
      </div>

      <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
        <p className="text-gray-400 uppercase text-xs mb-2">
          🏆 Závody
        </p>

        <h2 className="text-5xl font-black text-orange-400">
          {totalRaces}
        </h2>
      </div>

      <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
        <p className="text-gray-400 uppercase text-xs mb-2">
          ⭐ Body
        </p>

        <h2 className="text-5xl font-black text-red-500">
          {totalPoints}
        </h2>
      </div>

      <div className="bg-black/70 border border-red-900 rounded-2xl p-6">
        <p className="text-gray-400 uppercase text-xs mb-2">
          🎯 Nejlepší výsledek
        </p>

        <h2 className="text-5xl font-black text-blue-400">
          P{bestFinish}
        </h2>
      </div>

    </section>
  );
}