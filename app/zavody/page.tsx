import Header from "../components/Header";
import Footer from "../components/Footer";
import Countdown from "../components/Countdown";
import { createClient } from "@/lib/supabase-server";

import Image from "next/image";
import { trackImages } from "@/lib/trackImages";


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



    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("cs-CZ");
    };

    const upcomingRaces =
        zavody?.filter(
            (zavod) =>
                zavod.race_datetime &&
                new Date(zavod.race_datetime) > new Date()
        ) ?? [];

    const completedRaces =
        zavody?.filter(
            (zavod) =>
                zavod.race_datetime &&
                new Date(zavod.race_datetime) <= new Date()
        ) ?? [];

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

                    {/* DALŠÍ ZÁVOD */}

                    <div className="overflow-hidden bg-black/75 backdrop-blur-sm border border-red-900 rounded-2xl mb-10">

                        <div className="grid md:grid-cols-2">

                            {/* LEVÁ ČÁST */}

                            <div className="p-10 flex flex-col justify-center">

                                <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
                                    DALŠÍ ZÁVOD
                                </p>

                                <h2 className="text-5xl font-black mb-2">
                                    {dalsiZavod?.track ?? "Není naplánován závod"}
                                </h2>

                                <p className="text-gray-400 text-xl mb-10">
                                    {dalsiZavod?.series ?? "-"}
                                </p>

                                <div className="grid grid-cols-2 gap-8 mb-8">

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Datum
                                        </p>

                                        <p className="text-3xl font-black">
                                            {dalsiZavod?.race_date
                                                ? formatDate(dalsiZavod.race_date)
                                                : "-"}
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

                                </div>

                                <div className="border-t border-red-900 pt-6">

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

                            {/* PRAVÁ ČÁST */}

                            <div className="relative min-h-[340px]">

                                <Image
                                    src={trackImages[dalsiZavod?.track || ""] || "/hero-bg.png"}
                                    alt={dalsiZavod?.track || "Další závod"}
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80" />

                                <div className="absolute top-6 right-6">
                                    <span className="bg-green-500/90 text-white px-4 py-1 rounded-full text-xs font-bold">
                                        NADCHÁZEJÍCÍ
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="bg-black/75 backdrop-blur-sm border border-red-900 rounded-2xl p-10">
                        <h3 className="text-3xl font-black mb-8">
                            ROZPIS ZÁVODŮ
                        </h3>

                        <h4 className="text-xl font-bold text-green-400 mb-6">
                            NADCHÁZEJÍCÍ ZÁVODY
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">


                            {upcomingRaces.map((zavod) => (
                                <div
                                    key={zavod.id}
                                    className="overflow-hidden bg-black/80 border border-red-900 rounded-2xl hover:border-red-600 transition-all duration-300 hover:scale-[1.02]">
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={trackImages[zavod.track] || "/hero-bg.png"}
                                            alt={zavod.track}
                                            fill
                                            className="object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={
                                                    zavod.race_datetime &&
                                                        new Date(zavod.race_datetime) > new Date()
                                                        ? "bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-bold"
                                                        : "bg-gray-700/90 text-white px-3 py-1 rounded-full text-xs font-bold"
                                                }
                                            >
                                                {zavod.race_datetime &&
                                                    new Date(zavod.race_datetime) > new Date()
                                                    ? "NADCHÁZEJÍCÍ"
                                                    : "DOKONČENÝ"}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 p-6 pb-0 translate-y-10">
                                            <p className="text-red-500 text-xs uppercase tracking-[0.3em] mb-2">
                                                Týden {zavod.week}
                                            </p>

                                            <h4 className="text-2xl font-black leading-tight">
                                                {zavod.track}
                                            </h4>

                                            <p className="text-gray-300 text-sm mt-2">
                                                {zavod.series}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6">

                                        <div className="grid md:grid-cols-2 gap-4 mt-6">

                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Datum
                                                </p>

                                                <p className="font-bold text-lg">
                                                    {formatDate(zavod.race_date)}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Čas
                                                </p>

                                                <p className="font-bold text-lg">
                                                    {zavod.race_time}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>

                        <h4 className="text-xl font-bold text-gray-400 mt-12 mb-6">
                            DOKONČENÉ ZÁVODY
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {completedRaces.map((zavod) => (
                                <div
                                    key={zavod.id}
                                    className="overflow-hidden bg-black/60 border border-gray-800 rounded-2xl opacity-80"
                                >
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={trackImages[zavod.track] || "/hero-bg.png"}
                                            alt={zavod.track}
                                            fill
                                            className="object-cover grayscale"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                                        <div className="absolute top-4 right-4">
                                            <span className="bg-gray-700/90 text-white px-4 py-1 rounded-full text-xs font-bold">
                                                DOKONČENÝ
                                            </span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 p-6 pb-0 translate-y-10">
                                            <p className="text-red-500 text-xs uppercase tracking-[0.3em] mb-2">
                                                Týden {zavod.week}
                                            </p>

                                            <h4 className="text-2xl font-black leading-tight">
                                                {zavod.track}
                                            </h4>

                                            <p className="text-gray-300 text-sm mt-2">
                                                {zavod.series}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6">

                                        <div className="grid md:grid-cols-2 gap-4 mt-6">

                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Datum
                                                </p>

                                                <p className="font-bold text-lg">
                                                    {formatDate(zavod.race_date)}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Čas
                                                </p>

                                                <p className="font-bold text-lg">
                                                    {zavod.race_time}
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>


                            ))}

                        </div>


                    </div >

                </section >

                <Footer />
            </div >
        </main >
    );
}