import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";

export default function StatistikyPage() {
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
          <section className="pt-32 pb-24 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-red-500">
              U8 Divisione
            </p>

            <h1 className="mt-6 text-6xl xl:text-7xl font-black">
              STATISTIKY
            </h1>

            <p className="mt-5 text-lg text-gray-400">
              Statistiky týmu budou brzy dostupné.
            </p>
          </section>
        </Container>

        <Footer />
      </div>
    </main>
  );
}