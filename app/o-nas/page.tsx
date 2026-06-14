import Header from "../components/Header";
import Footer from "../components/Footer";

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
        <section
          id="o-nas"
          className="max-w-5xl mx-auto px-6 py-30">
          <div className="bg-black/75 backdrop-blur-sm p-10 rounded-xl border border-red-900">
            <h2 className="text-6xl font-bold text-red-500 mb-10">
              O nás
            </h2>

            <p className="text-xl text-gray-200 leading-10 mb-8">
              U8 Divisione není jen gaming projekt.
            </p>

            <p className="text-xl text-gray-300 leading-10 mb-8">
              Je to komunita postavená na vášni pro závodění, kompetitivní hraní a autentickou atmosféru moderního esportu.
            </p>

            <p className="text-xl text-gray-300 leading-10 mb-8">
              Zrozeno z endurance závodů, nočních stintů a hodin strávených na tratích jako Circuit de Spa-Francorchamps nebo Nürburgring, U8 Divisione spojuje sim racing, streaming a gaming kulturu do jedné identity.
            </p>

            <p className="text-xl text-gray-300 leading-10 mb-8">
              Naším cílem není pouze vyhrávat. Budujeme místo, kam se lidé chtějí vracet — kvůli atmosféře, příběhům ze závodů, komunitě a společné vášni pro gaming.
            </p>


            <h3 className="text-3xl font-black text-red-500 mb-6">
              Co tvoří U8 Divisione
            </h3>

            <ul className="space-y-4 text-gray-300 text-lg mb-8">
              <li>🏁 Sim racing a endurance závody</li>
              <li>🎥 Twitch streamy s autentickou atmosférou</li>
              <li>🤝 Gaming komunita bez toxicity</li>
              <li>🔥 Moderní esport/gamer styl</li>
              <li>🧠 Týmová spolupráce a strategie</li>
              <li>🎬 Obsah zaměřený na emoce a příběh závodu</li>
            </ul>

            <h3 className="text-3xl font-black text-red-500 mb-6">
              Naše filozofie
            </h3>

            <p className="text-gray-300 leading-8">
              Věříme, že nejlepší momenty nevznikají jen vítězstvím.
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li>• po třech hodinách závodu bojuješ o každý metr</li>
              <li>• tým drží spolu pod tlakem</li>
              <li>• noční stint rozhodne celý výsledek</li>
              <li>• comeback chutná lépe než jednoduchá výhra</li>
            </ul>

            <p className="text-white font-bold mb-6">
              U8 Divisione reprezentuje:
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <span className="border border-red-500 px-6 py-2 rounded-lg">
                Konzistence
              </span>

              <span className="border border-red-500 px-6 py-2 rounded-lg">
                Respekt
              </span>

              <span className="border border-red-500 px-6 py-2 rounded-lg">
                Disciplína
              </span>

              <span className="border border-red-500 px-6 py-2 rounded-lg">
                Radost ze hry
              </span>
            </div>

            <h3 className="text-4xl font-black text-red-500 mb-8">
              Obsah a komunita
            </h3>

            <p className="text-xl text-gray-300 leading-10 max-w-4xl mx-auto">
              Na Discordu i streamech vytváříme prostor pro fanoušky sim racingu,
              endurance jezdce, casual i kompetitivní hráče a všechny, kteří chtějí
              být součástí něčeho většího.
            </p>

            <p className="text-xl text-gray-300 leading-10 max-w-4xl mx-auto mt-8">
              Inspirujeme se moderní gaming kulturou a světovou esport scénou,
              ale U8 Divisione si buduje vlastní identitu — temnější, více cinematic
              a zaměřenou na motorsport atmosféru.
            </p>
            <h3 className="text-5xl font-black text-white mb-4">
              U8 Divisione není jen značka
            </h3>

            <p className="text-3xl text-red-500 font-bold">
              Je to styl. Je to mindset.
            </p>

            <p className="text-xl text-gray-300 mt-6">
              Je to místo, kde se z obyčejného závodu stává příběh.
            </p>
          </div>

        </section>



        <Footer />
      </div>
    </main>
  );
}