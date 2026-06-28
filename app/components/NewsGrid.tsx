import NewsCard from "./NewsCard";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image_url: string;
  race_date: string;
  track: string;
};

type Props = {
  articles: Article[];
};

export default function NewsGrid({ articles }: Props) {
  return (
    <section className="pb-24">

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
          />
        ))}

      </div>

    </section>
  );
}