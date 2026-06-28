import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import Section from "../../components/ui/Section";

import StatsSection from "../../components/ui/StatsSection";
import StatsGrid from "../../components/ui/StatsGrid";
import StatCard from "../../components/ui/StatCard";

export default function RekordyPage() {
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
            title="REKORDY"
            description="Nejlepší výkony a rekordy U8 Divisione."
          />

          <Section>

            <StatsSection
              title="Výsledky"
              icon="🏆"
            >

              <StatsGrid>

                <StatCard
                  value="-"
                  label="Nejlepší výsledek"
                />

                <StatCard
                  value="-"
                  label="Nejvíce bodů"
                />

                <StatCard
                  value="-"
                  label="Největší posun"
                />

                <StatCard
                  value="-"
                  label="Nejlepší kvalifikace"
                />

              </StatsGrid>

            </StatsSection>

            <StatsSection
              title="Technika"
              icon="🚗"
            >

              <StatsGrid>

                <StatCard
                  value="-"
                  label="Nejúspěšnější vůz"
                  small
                />

                <StatCard
                  value="-"
                  label="Nejúspěšnější trať"
                  small
                />

                <StatCard
                  value="-"
                  label="Nejdelší závod"
                />

                <StatCard
                  value="-"
                  label="Nejméně incidentů"
                />

              </StatsGrid>

            </StatsSection>

          </Section>

        </Container>

        <Footer />

      </div>
    </main>
  );
}