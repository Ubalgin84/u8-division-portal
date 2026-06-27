import Button from "./ui/Button";
import Card from "./ui/Card";

type FeaturedArticle = {
  race_date: string;
  title: string;
  excerpt: string;
  slug: string;
  track: string;
};

type Props = {
  article: FeaturedArticle;
};

export default function FeaturedArticleCard({ article }: Props) {
  return (
    <Card className="relative h-[390px] flex flex-col p-6">

      <p className="text-xs uppercase tracking-[0.35em] text-red-500 mb-4">
        Poslední reportáž
      </p>

      <p className="text-xs text-gray-500 mb-4">
        {article.race_date}
      </p>

      <h3 className="text-xl font-black leading-tight text-white mb-5">
        {article.title}
      </h3>

      <p className="text-gray-400 leading-8 flex-1">
        {article.excerpt}
      </p>

      <div className="mt-8">
        <Button href={`/novinky/${article.slug}`}>
          Číst reportáž
        </Button>
      </div>

    </Card>
  );
}