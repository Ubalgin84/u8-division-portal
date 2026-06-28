import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

import NewsHero from "../components/NewsHero";
import FeaturedNews from "../components/FeaturedNews";
import NewsGrid from "../components/NewsGrid";

import { createClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("race_date", { ascending: false });

  const featuredArticle = articles?.[0];
  const otherArticles = articles?.slice(1) ?? [];

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="min-h-screen bg-black/60">

        <Header />

        <Container size="wide">

          <NewsHero />

          {featuredArticle && (
            <FeaturedNews article={featuredArticle} />
          )}

          <NewsGrid articles={otherArticles} />

        </Container>

        <Footer />

      </div>
    </main>
  );
}