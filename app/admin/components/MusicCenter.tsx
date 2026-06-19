import Link from "next/link";

export default function MusicCenter() {
    return (
        <section className="bg-black/70 border border-red-900 rounded-2xl p-6 h-full">

            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-red-500 uppercase tracking-[0.3em] text-sm">
                        Music Center
                    </p>

                    <h2 className="text-3xl font-black mt-2">
                        U8 Soundtrack
                    </h2>
                </div>
            </div>

            <div className="grid md:grid-cols-[240px_1fr] gap-6">

                <div className="border border-red-900 rounded-xl overflow-hidden">
                    <img
                        src="/music-cover.png"
                        alt="U8 Soundtrack"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="border border-red-900 rounded-xl p-4">
                            <p className="text-gray-400 text-sm">
                                Tracks
                            </p>

                            <h3 className="text-4xl font-black mt-2">
                                12
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                Available
                            </p>
                        </div>

                        <div className="border border-red-900 rounded-xl p-4">
                            <p className="text-gray-400 text-sm">
                                Latest Track
                            </p>

                            <h3 className="text-lg font-bold mt-2">
                                Watkins Glen Theme
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                U8 Soundtrack
                            </p>
                        </div>

                    </div>

                    <Link
                        href="/hudba"
                        className="inline-flex mt-4 border border-red-600 px-5 py-3 rounded-xl hover:bg-red-600 transition"
                    >
                        Open Music Library
                    </Link>

                </div>

            </div>

        </section>
    );
}