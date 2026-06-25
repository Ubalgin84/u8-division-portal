import Link from "next/link";
import Button from "./ui/Button";
import Card from "./ui/Card";

type FeaturedArticle = {
  race_date: string;
  title: string;
  excerpt: string;
  slug: string;
};

type Props = {
  article: FeaturedArticle;
};

export default function FeaturedArticleCard({ article }: Props) {
  return (
    <Card className="mt-8 max-w-md">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-red-500">
        Poslední reportáž
      </p>

      <p className="mb-3 text-xs text-gray-500">
        {article.race_date}
      </p>

      <h3 className="mb-3 text-xl font-black text-white">
        {article.title}
      </h3>

      <p className="mb-5 line-clamp-3 text-gray-400">
        {article.excerpt}
      </p>

      <Button href={`/novinky/${article.slug}`}>
        Číst reportáž
      </Button>
    </Card>
  );
}