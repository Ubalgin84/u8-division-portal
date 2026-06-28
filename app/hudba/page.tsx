export const dynamic = "force-dynamic";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "@/lib/supabase-server";
import U8MusicLibrary from "../components/U8MusicLibrary";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import InfoCard from "../components/ui/InfoCard";

export default async function HudbaPage() {
  const supabase = await createClient();

  const { data: songs } = await supabase
    .from("songs")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/70 min-h-screen">

        <Header />

        <Container size="wide">

          <PageHero
            eyebrow="U8 Divisione"
            title="HUDBA"
            description="Oficiální hudební knihovna U8 Divisione. Originální soundtracky vytvořené pro závodní příběhy, emoce a okamžiky našeho týmu."
          />

          <Section>

            {!songs?.length ? (
              <InfoCard className="text-center">
                <h2 className="text-4xl font-black mb-4">
                  Žádné skladby
                </h2>

                <p className="text-gray-400">
                  Hudební knihovna je zatím prázdná.
                </p>

              </InfoCard>
            ) : (
              <U8MusicLibrary songs={songs || []} />
            )}

          </Section>
        </Container>
        <Footer />



      </div>
    </main>
  );
}