import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import Section from "../../components/ui/Section";
import { createClient } from "@/lib/supabase-server";
import { getTeamStats } from "@/lib/stats";
import StatCard from "../../components/ui/StatCard";
import StatsGrid from "../../components/ui/StatsGrid";
import StatsSection from "../../components/ui/StatsSection";
import SectionHeading from "../../components/ui/SectionHeading";
import {
    ChartColumn,
    TrendingUp,
    CarFront,
} from "lucide-react";


export default async function StatistikyPage() {

    const supabase = await createClient();

    const { data: results } = await supabase
        .from("results")
        .select("*");

    const stats = getTeamStats(results || []);

    return (
        <main
            className="min-h-screen text-white bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: "url('/hero-bg.png')",
            }}
        >
            <div className="min-h-screen bg-black/60">
                <Header />

                <Container size="wide">
                    <PageHero
                        eyebrow="U8 Divisione"
                        title="STATISTIKY"
                        description="Komplexní přehled statistik U8 Divisione."
                    />

                    <Section>


                        <SectionHeading
                            icon={ChartColumn}
                            centered
                        >
                            Základní statistiky
                        </SectionHeading>

                        <StatsGrid>

                            <StatCard
                                value={stats.totalRaces}
                                label="Celkem závodů"
                            />

                            <StatCard
                                value={stats.totalPoints}
                                label="Celkem bodů"
                            />

                            <StatCard
                                value={stats.wins}
                                label="Vítězství"
                            />

                            <StatCard
                                value={stats.podiums}
                                label="Pódia"
                            />

                        </StatsGrid>


                        <SectionHeading
                            icon={TrendingUp}
                            centered
                        >
                            Výkonnost
                        </SectionHeading>


                        <StatsGrid>

                            <StatCard
                                value={`P${stats.averageFinish}`}
                                label="Průměrné umístění"
                            />

                            <StatCard
                                value={`P${stats.bestFinish}`}
                                label="Nejlepší výsledek"
                            />

                            <StatCard
                                value={`P${stats.worstFinish}`}
                                label="Nejhorší výsledek"
                            />

                            <StatCard
                                value={stats.top5}
                                label="Top 5"
                            />

                        </StatsGrid>


                        <SectionHeading
                            icon={CarFront}
                            centered
                        >
                            Technika
                        </SectionHeading>

                        <StatsGrid>

                            <StatCard
                                value={stats.favoriteCar}
                                label="Nejpoužívanější vůz"
                                small
                            />

                            <StatCard
                                value={stats.favoriteTrack}
                                label="Nejoblíbenější trať"
                                small
                            />

                            <StatCard
                                value={stats.averageIncidents}
                                label="Průměr incidentů"
                            />

                            <StatCard
                                value={stats.averagePoints}
                                label="Průměr bodů"
                            />

                        </StatsGrid>


                    </Section>
                </Container>

                <Footer />
            </div>
        </main >
    );
}