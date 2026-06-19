export default function DriverCenter() {
    return (
        <section className="bg-black/70 border border-red-900 rounded-2xl p-6 mb-10">

            <div className="flex items-center justify-between mb-6">

                <div>
                    <p className="text-red-500 uppercase tracking-[0.3em] text-sm">
                        Driver Center
                    </p>

                    <h2 className="text-3xl font-black mt-2">
                        Ubalgin_8
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Driver Profile • Future iRacing Integration
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-gray-500 text-sm">
                        Future iRacing Integration
                    </p>
                </div>

            </div>

            <div className="grid md:grid-cols-[240px_1fr] gap-6">

                <div className="border border-red-900 rounded-xl overflow-hidden">
                    <img
                        src="/driver-helmet.png"
                        alt="Driver Helmet"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>

                    <h3 className="text-3xl font-black mb-2">
                        Ubalgin_8
                    </h3>

                    <p className="text-gray-500 text-sm mb-6">
                        Driver Profile • Future iRacing Integration
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div className="border border-red-900 rounded-xl p-4">
                            <p className="text-gray-400 text-sm">
                                iRating
                            </p>

                            <p className="text-2xl font-black">
                                —
                            </p>

                            <p className="text-gray-500 text-sm">
                                Coming Soon
                            </p>
                        </div>

                        <div className="border border-red-900 rounded-xl p-4">
                            <p className="text-gray-400 text-sm">
                                Safety Rating
                            </p>

                            <p className="text-2xl font-black">
                                —
                            </p>

                            <p className="text-gray-500 text-sm">
                                Coming Soon
                            </p>
                        </div>

                        <div className="border border-red-900 rounded-xl p-4">
                            <p className="text-gray-400 text-sm">
                                License
                            </p>

                            <p className="text-2xl font-black">
                                —
                            </p>

                            <p className="text-gray-500 text-sm">
                                Coming Soon
                            </p>
                        </div>

                        <div className="border border-red-900 rounded-xl p-4">
                            <p className="text-gray-400 text-sm">
                                Club
                            </p>

                            <p className="text-2xl font-black">
                                —
                            </p>

                            <p className="text-gray-500 text-sm">
                                Coming Soon
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}