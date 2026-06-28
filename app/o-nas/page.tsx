import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import InfoCard from "../components/ui/InfoCard";
import Badge from "../components/ui/Badge";

export default function ONasPage() {
  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/60 min-h-screen">
        <Header />

        <Container size="wide">
          <PageHero
            eyebrow="U8 Divisione"
            title="O NÁS"
            description="Více než jen tým. U8 Divisione je komunita lidí, kteří se zasazují o výkon a konzistenci v simracingu."
          />

          <Section>
            <InfoCard>
              <h2 className="text-6xl font-bold text-red-500 mb-10">
                O nás
              </h2>

              <p className="text-3xl text-red-500 font-bold mb-10">
                Chaos. Comeback. Endurance.
              </p>

              <p className="text-xl text-gray-200 leading-10 mb-8">
                U8 Divisione není jen simracing tým.
              </p>

              <p className="text-xl text-gray-300 leading-10 mb-8">
                Je to projekt postavený na vytrvalosti, strategii a schopnosti
                vrátit se do boje i ve chvíli, kdy se závod zdá být ztracený.
              </p>

              <p className="text-xl text-gray-300 leading-10 mb-8">
                Každý závod vytváří vlastní příběh. Každá chyba přináší novou
                výzvu. Každý comeback se stává součástí historie U8 Divisione.
              </p>

              <p className="text-xl text-gray-300 leading-10 mb-8">
                Naším cílem není pouze sbírat výsledky. Chceme zachytit celý
                příběh závodu — od startu přes strategii až po cílovou vlajku.
              </p>

              <p className="text-xl text-gray-300 leading-10 mb-16">
                Proto propojujeme výsledky, reportáže, fotografie a originální
                soundtracky inspirované skutečnými závody našeho týmu.
              </p>

              <h3 className="text-4xl font-black text-red-500 mb-8">
                Kam směřujeme
              </h3>

              <p className="text-xl text-gray-300 leading-10 mb-8">
                Budujeme moderní simracing tým propojující závody, reportáže,
                vlastní hudbu a komunitu kolem motorsportu.
              </p>

              <p className="text-xl text-gray-300 leading-10 mb-16">
                Každý závod má zanechat stopu.
                <br />
                Výsledek. Report. Fotografie. Soundtrack.
                <br />
                A společně vytvořit historii U8 Divisione.
              </p>

              <h3 className="text-3xl font-black text-red-500 mb-6">
                Co tvoří U8 Divisione
              </h3>

              <ul className="space-y-4 text-gray-300 text-lg mb-12">
                <li>🏁 Sim racing a endurance závody</li>
                <li>📰 Detailní reportáže ze závodů</li>
                <li>📸 Fotografie a vizuální identita týmu</li>
                <li>🎵 Originální soundtracky inspirované závody</li>
                <li>🎥 Twitch streamy s autentickou atmosférou</li>
                <li>🤝 Komunita bez toxicity</li>
                <li>🧠 Týmová spolupráce a strategie</li>
              </ul>

              <h3 className="text-3xl font-black text-red-500 mb-6">
                Naše filozofie
              </h3>

              <p className="text-gray-300 leading-8">
                Věříme, že nejlepší momenty nevznikají pouze vítězstvím.
              </p>

              <ul className="mt-6 space-y-3 text-gray-300 mb-12">
                <li>• po třech hodinách závodu bojuješ o každý metr</li>
                <li>• tým drží spolu pod tlakem</li>
                <li>• noční stint rozhodne celý výsledek</li>
                <li>• comeback chutná lépe než jednoduchá výhra</li>
              </ul>

              <p className="text-white font-bold mb-6">
                U8 Divisione reprezentuje:
              </p>

              <div className="flex flex-wrap gap-4 mb-12">

                <Badge>Konzistence</Badge>

                <Badge>Respekt</Badge>

                <Badge>Disciplína</Badge>

                <Badge>Vytrvalost</Badge>

                <Badge>Týmová práce</Badge>

              </div>

              <h3 className="text-4xl font-black text-red-500 mb-8">
                Obsah a komunita
              </h3>

              <p className="text-xl text-gray-300 leading-10 max-w-4xl mx-auto">
                Na Discordu i streamech vytváříme prostor pro fanoušky sim racingu,
                endurance jezdce, casual i kompetitivní hráče a všechny, kteří
                chtějí být součástí něčeho většího.
              </p>

              <p className="text-xl text-gray-300 leading-10 max-w-4xl mx-auto mt-8">
                Inspirujeme se moderní gaming kulturou a světovou esport scénou,
                ale U8 Divisione si buduje vlastní identitu — temnější,
                cinematic a zaměřenou na motorsport atmosféru.
              </p>

              <h3 className="text-5xl font-black text-white mt-16 mb-4">
                U8 Divisione není jen značka
              </h3>

              <p className="text-3xl text-red-500 font-bold">
                Je to styl. Je to mindset.
              </p>

              <p className="text-xl text-gray-300 mt-6">
                Je to místo, kde se z obyčejného závodu stává příběh.
              </p>
            </InfoCard>
          </Section>
        </Container>

        <Footer />
      </div>
    </main>
  );
}