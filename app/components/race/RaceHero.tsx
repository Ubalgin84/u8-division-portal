type Props = {
  article: any;
};

export default function RaceHero({ article }: Props) {
 

  return (
    <div className="text-center mb-16">

      <p className="text-red-500 uppercase tracking-[0.4em] mb-4">
        U8 DIVISIONE REPORT
      </p>

      <h1 className="text-7xl font-black mb-6">
        {article.title}
      </h1>

      <p className="text-gray-400 text-xl max-w-3xl mx-auto">
        {article.excerpt}
      </p>

      {(article.featured_image || article.image_url) && (
        <img
          src={article.featured_image || article.image_url}
          alt={article.title}
          className="w-full max-w-5xl mx-auto rounded-2xl border border-red-900 mt-12 mb-12 object-cover"
        />
      )}

    </div>
  );
}