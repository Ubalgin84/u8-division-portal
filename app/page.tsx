export const dynamic = "force-dynamic";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default async function Home() {
  return (
    <main
      className="h-screen overflow-hidden text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="relative h-screen bg-black/60">

        <Header />

        <Hero />

        
        <Footer />

      </div>
    </main>
  );
}