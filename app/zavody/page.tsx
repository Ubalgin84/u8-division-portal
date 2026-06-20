import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "@/lib/supabase-server";

export default async function ZavodyPage() {
    const supabase = await createClient();

    const { data: zavody } = await supabase
        .from("race_calendar")
        .select("*")
        .order("week", { ascending: true });

    const dalsiZavod = zavody?.find(
        (zavod) => zavod.status === "upcoming"
    );

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* HERO */}

            <section
                className="relative h-[500px] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/hero-bg.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/70 flex items-center">

                    <div className="max-w-7xl mx-auto px-8">

                        <p className="text-red-500 uppercase tracking-[0.4em] text-sm mb-4">
                            U8 Divisione
                        </p>

                        <h1 className="text-7xl font-black mb-4">
                            KALENDÁŘ ZÁVODŮ
                        </h1>

                        <p className="text-xl text-gray-300 max-w-2xl">
                            Sledujte nadcházející závody, kalendář sezóny a postup týmu.
                        </p>

                    </div>

                </div>
            </section>

            {/* OBSAH */}

            <section className="max-w-7xl mx-auto px-8 py-16">

                {/* DALŠÍ ZÁVOD */}

                <div className="bg-black/70 border border-red-900 rounded-2xl p-10 mb-10">

                    <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
                        DALŠÍ ZÁVOD
                    </p>

                    <h2 className="text-5xl font-black mb-2">
                        {dalsiZavod?.track ?? "Není naplánován závod"}
                    </h2>

                    <p className="text-gray-400 text-xl mb-8">
                        {dalsiZavod?.series ?? "-"}
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Datum
                            </p>

                            <p className="text-3xl font-black">
                                {dalsiZavod?.race_date ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Čas
                            </p>

                            <p className="text-3xl font-black">
                                {dalsiZavod?.race_time ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Stav
                            </p>

                            <p className="text-green-400 text-3xl font-black">
                                {dalsiZavod?.status === "upcoming"
                                    ? "NADCHÁZEJÍCÍ"
                                    : dalsiZavod?.status === "planned"
                                        ? "PLÁNOVANÝ"
                                        : "DOKONČENÝ"}
                            </p>
                        </div>

                    </div>

                </div>

                {/* PŘEHLED SEZÓNY */}

                <div className="grid lg:grid-cols-2 gap-6 mb-10">

                    <div className="bg-black/70 border border-red-900 rounded-2xl p-8">

                        <h3 className="text-3xl font-black mb-6">
                            PŘEHLED SEZÓNY
                        </h3>

                        <div className="space-y-4">

                            <p>
                                Sezóna: {dalsiZavod?.season ?? "-"}
                            </p>

                            <p>
                                Aktuální týden: {dalsiZavod?.week ?? "-"}
                            </p>

                            <p>
                                Aktuální trať: {dalsiZavod?.track ?? "-"}
                            </p>

                        </div>

                    </div>

                    <div className="bg-black/70 border border-red-900 rounded-2xl p-8">

                        <h3 className="text-3xl font-black mb-6">
                            STATISTIKY SEZÓNY
                        </h3>

                        <div className="space-y-4">

                            <p>
                                Celkem závodů: {zavody?.length ?? 0}
                            </p>

                            <p>
                                Nadcházející: {
                                    zavody?.filter(
                                        (zavod) => zavod.status === "upcoming"
                                    ).length ?? 0
                                }
                            </p>

                            <p>
                                Plánované: {
                                    zavody?.filter(
                                        (zavod) => zavod.status === "planned"
                                    ).length ?? 0
                                }
                            </p>

                        </div>

                    </div>

                </div>

                {/* ROZPIS ZÁVODŮ */}

                <div className="bg-black/70 border border-red-900 rounded-2xl p-8">

                    <h3 className="text-3xl font-black mb-8">
                        ROZPIS ZÁVODŮ
                    </h3>

                    <div className="space-y-4">

                        {zavody?.map((zavod) => (
                            <div
                                key={zavod.id}
                                className="border border-red-900 rounded-xl p-5 flex justify-between items-center"
                            >
                                <span>
                                    Týden {zavod.week}
                                </span>

                                <span>
                                    {zavod.track}
                                </span>

                                <span
                                    className={
                                        zavod.status === "upcoming"
                                            ? "text-green-400"
                                            : "text-gray-400"
                                    }
                                >
                                    {zavod.status === "upcoming"
                                        ? "NADCHÁZEJÍCÍ"
                                        : zavod.status === "planned"
                                            ? "PLÁNOVANÝ"
                                            : "DOKONČENÝ"}
                                </span>
                            </div>
                        ))}

                    </div>

                </div>

            </section>

            <Footer />
        </main>
    );
}