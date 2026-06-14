export const dynamic = "force-dynamic";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Uspechy from "./components/Uspechy";

export default async function Home() {
  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "75% center",
      }}
    >
      <div className="bg-black/60 min-h-screen">
        <Header />
        <Hero />
        <Uspechy />
        <Footer />
      </div>
    </main>
  );
}