import Header from "../components/Header";
import Footer from "../components/Footer";
import Countdown from "../components/Countdown";
import { createClient } from "@/lib/supabase-server";


export default async function ZavodyPage() {
    const supabase = await createClient();

    const { data: zavody } = await supabase
        .from("race_calendar")
        .select("*")
        .order("race_datetime", { ascending: true });

    const ted = new Date();

    const dalsiZavod = zavody
        ?.filter(
            (zavod) =>
                zavod.race_datetime &&
                new Date(zavod.race_datetime) > ted
        )
        .sort(
            (a, b) =>
                new Date(a.race_datetime).getTime() -
                new Date(b.race_datetime).getTime()
        )[0];

    const rozdilMs = dalsiZavod?.race_datetime
        ? new Date(dalsiZavod.race_datetime).getTime() - Date.now()
        : 0;

    const dny = Math.max(
        0,
        Math.floor(rozdilMs / (1000 * 60 * 60 * 24))
    );

    const hodiny = Math.max(
        0,
        Math.floor(
            (rozdilMs % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        )
    );

    const minuty = Math.max(
        0,
        Math.floor(
            (rozdilMs % (1000 * 60 * 60)) /
            (1000 * 60)
        )
    );

    return (
        <main
            className="min-h-screen text-white bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: "url('/hero-bg.png')",
            }}
        >
            <div className="bg-black/60 min-h-screen">
                <Header />

                {/* HERO */}

                <section className="relative h-[500px]">
                    <div className="absolute inset-0 bg-black/10 flex items-center">

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

                    <div className="bg-black/75 backdrop-blur-sm border border-red-900 rounded-2xl p-10">

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
                                    NADCHÁZEJÍCÍ
                                </p>
                            </div>

                            <div className="mt-8 border-t border-red-900 pt-6">

                                <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-2">
                                    START ZA
                                </p>

                                {dalsiZavod?.race_datetime && (
                                    <Countdown
                                        raceDatetime={dalsiZavod.race_datetime}
                                    />
                                )}

                            </div>

                        </div>

                    </div>

                    {/* PŘEHLED SEZÓNY */}

                    <div className="grid lg:grid-cols-2 gap-6 mb-10">

                        <div className="bg-black/75 backdrop-blur-sm border border-red-900 rounded-2xl p-8">

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

                        <div className="bg-black/75 backdrop-blur-sm border border-red-900 rounded-2xl p-8">

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
                                    Nadcházející: {
                                        zavody?.filter(
                                            (zavod) =>
                                                zavod.race_datetime &&
                                                new Date(zavod.race_datetime) > new Date()
                                        ).length ?? 0
                                    }
                                </p>
                                <p>
                                    Dokončené: {
                                        zavody?.filter(
                                            (zavod) => zavod.status === "completed"
                                        ).length ?? 0
                                    }
                                </p>

                            </div>

                        </div>

                    </div>
                    <div className="bg-black/75 backdrop-blur-sm border border-red-900 rounded-2xl p-10">
                        <h3 className="text-3xl font-black mb-8">
                            ROZPIS ZÁVODŮ
                        </h3>

                        <div className="space-y-4">


                            {zavody?.map((zavod) => (
                                <div
                                    key={zavod.id}
                                    className="border border-red-900 rounded-2xl p-6"
                                >
                                    <div className="flex justify-between items-start">

                                        <div>
                                            <p className="text-red-500 text-sm uppercase tracking-[0.2em]">
                                                Týden {zavod.week}
                                            </p>

                                            <h4 className="text-3xl font-black mt-2">
                                                {zavod.track}
                                            </h4>

                                            <p className="text-gray-400 mt-2">
                                                {zavod.series}
                                            </p>
                                        </div>

                                        <div
                                            className={
                                                zavod.race_datetime &&
                                                    new Date(zavod.race_datetime) > new Date()
                                                    ? "text-green-400 font-bold"
                                                    : "text-gray-400 font-bold"
                                            }
                                        >
                                            {
                                                zavod.race_datetime &&
                                                    new Date(zavod.race_datetime) > new Date()
                                                    ? "NADCHÁZEJÍCÍ"
                                                    : "DOKONČENÝ"
                                            }
                                        </div>

                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mt-6">

                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Datum
                                            </p>

                                            <p className="font-bold">
                                                {zavod.race_date}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Čas
                                            </p>

                                            <p className="font-bold">
                                                {zavod.race_time}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </section >

                <Footer />
            </div>
        </main>
    );
}