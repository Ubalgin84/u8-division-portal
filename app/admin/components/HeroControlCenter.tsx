import Link from "next/link";

interface HeroControlCenterProps {
    latestRace: any;
    latestArticle: any;
}

export default function HeroControlCenter({
    latestRace,
    latestArticle,
}: HeroControlCenterProps) {
    return (
        <section className="bg-black/70 border border-red-900 rounded-2xl overflow-hidden mb-8">

            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-red-900">

                {/* POSLEDNÍ ZÁVOD */}

                <div className="p-8">
                    <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
                        Poslední závod
                    </p>

                    <h2 className="text-3xl font-black mb-2">
                        {latestRace?.race_name ?? "Coming Soon"}
                    </h2>

                    <p className="text-gray-400 mb-6">
                        {latestRace?.track ?? "No data"}
                    </p>

                    {latestRace && (
                        <div className="flex gap-8">

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Start
                                </p>

                                <p className="text-2xl font-black">
                                    P{latestRace.start_pos}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Cíl
                                </p>

                                <p className="text-2xl font-black text-red-500">
                                    P{latestRace.finish_pos}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Body
                                </p>

                                <p className="text-2xl font-black">
                                    {latestRace.points}
                                </p>
                            </div>

                        </div>
                    )}
                </div>

                {/* POSLEDNÍ REPORT */}

                <div className="p-8">
                    <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
                        Poslední report
                    </p>

                    <h2 className="text-2xl font-black mb-4">
                        {latestArticle?.title ?? "No reports yet"}
                    </h2>

                    <p className="text-gray-400 line-clamp-3 mb-6">
                        {latestArticle?.excerpt}
                    </p>

                    {latestArticle && (
                        <Link
                            href={`/novinky/${latestArticle.slug}`}
                            target="_blank"
                            className="inline-flex border border-red-600 px-5 py-3 rounded-xl hover:bg-red-600 transition"
                        >
                            Otevřít report
                        </Link>
                    )}
                </div>

                {/* SYSTEM STATUS */}

                <div className="p-8">

                    <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-6">
                        Systémový stav
                    </p>

                    <div className="space-y-4">

                        <div className="flex justify-between">
                            <span>Supabase</span>
                            <span className="text-green-400 font-bold">
                                ONLINE
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Storage</span>
                            <span className="text-green-400 font-bold">
                                ONLINE
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>AI Reports</span>
                            <span className="text-green-400 font-bold">
                                READY
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Music System</span>
                            <span className="text-green-400 font-bold">
                                READY
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>iRacing API</span>
                            <span className="text-yellow-400 font-bold">
                                PLANNED
                            </span>
                        </div>

                    </div>

                </div>
            </div>

        </section>
    );
}