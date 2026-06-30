import Header from "../components/Header";
import Footer from "../components/Footer";
import Countdown from "../components/Countdown";
import { createClient } from "@/lib/supabase-server";

import Image from "next/image";
import { getTrackImage } from "@/lib/trackImages";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import Badge from "../components/ui/Badge";
import Section from "../components/ui/Section";
import InfoCard from "../components/ui/InfoCard";


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

                <Container size="wide">
                    <PageHero
                        eyebrow="U8 Divisione"
                        title="KALENDÁŘ ZÁVODŮ"
                        description="Sledujte nadcházející závody, kalendář sezóny a postup týmu."
                    />
                </Container>

                {/* OBSAH */}

                <Container size="wide">
                    <Section className="pb-24">

                        {/* DALŠÍ ZÁVOD */}

                        {/* DALŠÍ ZÁVOD */}

                        {dalsiZavod ? (

                            <InfoCard className="overflow-hidden mb-10 p-0">

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
                                            src={getTrackImage(dalsiZavod?.track)}
                                            alt={dalsiZavod?.track || "Další závod"}
                                            fill
                                            className="object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80" />

                                        <div className="absolute top-6 right-6">
                                            <Badge color="green">
                                                NADCHÁZEJÍCÍ
                                            </Badge>
                                        </div>

                                    </div>

                                </div>

                            </InfoCard>

                        ) : (
                            <InfoCard className="p-12 text-center">
                                <p className="text-red-500 uppercase tracking-[0.3em] text-sm">
                                    KALENDÁŘ
                                </p>

                                <h2 className="mt-4 text-4xl font-black">
                                    Aktuálně není vypsán žádný závod
                                </h2>

                                <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                                    Jakmile bude zveřejněn nový kalendář sezóny,
                                    zobrazí se zde informace o dalším závodě.
                                </p>
                            </InfoCard>
                        )}

                        <InfoCard className="p-10">
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
                                        className="group overflow-hidden bg-black/80 border border-red-900 rounded-2xl hover:border-red-600 transition-all duration-300 hover:scale-[1.02]">
                                        <div className="relative h-64 w-full">
                                            <Image
                                                src={getTrackImage(zavod.track)}
                                                alt={zavod.track}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                                            <div className="absolute top-4 right-4">
                                                {zavod.race_datetime &&
                                                    new Date(zavod.race_datetime) > new Date() ? (
                                                    <Badge color="green">
                                                        NADCHÁZEJÍCÍ
                                                    </Badge>
                                                ) : (
                                                    <Badge color="gray">
                                                        DOKONČENÝ
                                                    </Badge>
                                                )}
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
                                        className="group overflow-hidden bg-black/60 border border-gray-800 rounded-2xl opacity-70 hover:opacity-100 transition-all duration-300"
                                    >
                                        <div className="relative h-64 w-full">
                                            <Image
                                                src={getTrackImage(zavod.track)}
                                                alt={zavod.track}
                                                fill
                                                className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                                            <div className="absolute top-4 right-4">
                                                <Badge color="gray">
                                                    DOKONČENÝ
                                                </Badge>
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


                        </InfoCard>

                    </Section>
                </Container>
                <Footer />
            </div >
        </main >
    );
}