import {
    FileText,
    Trophy,
    Star,
    Target,
} from "lucide-react";

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

            <div className="bg-black/70 border border-red-900 hover:border-red-500 transition rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-3">
                    <FileText size={18} className="text-white" />
                    <p className="text-gray-400 uppercase text-xs">
                        Reporty
                    </p>
                </div>

                <h2 className="text-5xl font-black text-white">
                    {articleCount}
                </h2>

            </div>

            <div className="bg-black/70 border border-red-900 hover:border-red-500 transition rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-3">
                    <Trophy size={18} className="text-orange-400" />
                    <p className="text-gray-400 uppercase text-xs">
                        Závody
                    </p>
                </div>

                <h2 className="text-5xl font-black text-orange-400">
                    {totalRaces}
                </h2>

            </div>

            <div className="bg-black/70 border border-red-900 hover:border-red-500 transition rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-3">
                    <Star size={18} className="text-red-500" />
                    <p className="text-gray-400 uppercase text-xs">
                        Body
                    </p>
                </div>

                <h2 className="text-5xl font-black text-red-500">
                    {totalPoints}
                </h2>

            </div>

            <div className="bg-black/70 border border-red-900 hover:border-red-500 transition rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-3">
                    <Target size={18} className="text-blue-400" />
                    <p className="text-gray-400 uppercase text-xs">
                        Nejlepší výsledek
                    </p>
                </div>

                <h2 className="text-5xl font-black text-blue-400">
                    P{bestFinish}
                </h2>

            </div>

        </section>
    );
}