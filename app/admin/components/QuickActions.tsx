import Link from "next/link";

export default function QuickActions() {
    return (
        <section className="bg-black/70 border border-red-900 rounded-2xl p-6 h-full">

            <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-6">
                Quick Actions
            </p>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">

                <Link
                    href="/admin/novy-clanek"
                    className="bg-black/70 border border-red-900 rounded-2xl p-6 hover:border-red-500 hover:bg-red-950/20 transition"
                >
                    <p className="text-3xl mb-3">📰</p>
                    <h3 className="font-bold">
                        Nový článek
                    </h3>
                </Link>

                <Link
                    href="/admin/ai-report"
                    className="bg-black/70 border border-red-900 rounded-2xl p-6 hover:border-red-500 hover:bg-red-950/20 transition"
                >
                    <p className="text-3xl mb-3">🤖</p>
                    <h3 className="font-bold">
                        AI Report
                    </h3>
                </Link>

                <Link
                    href="/admin/hudba"
                    className="bg-black/70 border border-red-900 rounded-2xl p-6 hover:border-red-500 hover:bg-red-950/20 transition"
                >
                    <p className="text-3xl mb-3">🎵</p>
                    <h3 className="font-bold">
                        Hudební knihovna
                    </h3>
                </Link>

                <Link
                    href="/admin/vysledky"
                    className="bg-black/70 border border-yellow-900 rounded-2xl p-6 hover:border-yellow-500 transition"
                >
                    <p className="text-3xl mb-3">🏁</p>
                    <h3 className="font-bold">
                        Výsledky
                    </h3>
                </Link>

                <div
                    className="bg-black/70 border border-green-900 rounded-2xl p-6"
                >
                    <p className="text-3xl mb-3">👤</p>
                    <h3 className="font-bold">
                        Driver Center
                    </h3>

                    <p className="text-gray-500 text-sm mt-2">
                        Coming Soon
                    </p>
                </div>

                <div
                    className="bg-black/70 border border-blue-900 rounded-2xl p-6"
                >
                    <p className="text-3xl mb-3">📅</p>
                    <h3 className="font-bold">
                        Race Calendar
                    </h3>

                    <p className="text-gray-500 text-sm mt-2">
                        Coming Soon
                    </p>
                </div>

            </div>

        </section>
    );
}