export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import RaceHero from "../../components/race/RaceHero";
import RaceStats from "../../components/race/RaceStats";
import RaceMusic from "../../components/race/RaceMusic";
import RaceReaction from "../../components/race/RaceReaction";
import { getRace } from "@/lib/race";
import RaceContent from "../../components/race/RaceContent";
import RaceSummary from "../../components/race/RaceSummary";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {

  const { slug } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("title, excerpt, featured_image, image_url")
    .eq("slug", slug)
    .single();

  if (!article) {
    return {
      title: "U8 Divisione",
      description: "Motorsport reportáže U8 Divisione",
    };
  }

  return {
    title: `${article.title} | U8 Divisione`,
    description: article.excerpt,

    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: (article.featured_image || article.image_url)
        ? [
          {
            url: article.featured_image || article.image_url,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: (article.featured_image || article.image_url)
        ? [article.featured_image || article.image_url]
        : [],
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!article) {
    notFound();
  }

  // const race = await getRace(article.slug);

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="bg-black/80 min-h-screen">

        <Header />

        <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">

          <RaceHero article={article} />

          <RaceSummary article={article} />

          <div className="bg-black/60 border border-red-900 rounded-2xl p-12 max-w-5xl mx-auto">

            <RaceContent content={article.content} />

            <RaceStats article={article} />

            <RaceMusic article={article} />

            <RaceReaction article={article} />

          </div>
        </section>

        <Footer />

      </div>
    </main>
  );
}