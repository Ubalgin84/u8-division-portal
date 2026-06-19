import Link from "next/link";

interface FeaturedReportProps {
  article: any;
}

export default function FeaturedReport({
  article,
}: FeaturedReportProps) {
  if (!article) return null;

  return (
    <section className="bg-black/70 border border-red-900 rounded-2xl p-6 h-full">

      <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
        Poslední report
      </p>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">

        <div className="border border-red-900 rounded-xl overflow-hidden">
          <img
            src={article.image_url || "/hero-bg.png"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>

          <h2 className="text-3xl font-black mb-4">
            {article.title}
          </h2>

          <p className="text-gray-400 mb-6 line-clamp-4">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">

            <span>
              📅 {article.created_at
                ? new Date(article.created_at).toLocaleDateString("cs-CZ")
                : "N/A"}
            </span>

            <span>
              🤖 AI Report
            </span>

            <span>
              📍 {article.track || "Unknown Track"}
            </span>

          </div>

          <div className="flex gap-3">

            <a
              href={`/novinky/${article.slug}`}
              target="_blank"
              className="border border-green-600 px-5 py-3 rounded-xl hover:bg-green-600 transition"
            >
              Zobrazit
            </a>

            <Link
              href={`/admin/edit/${article.id}`}
              className="border border-yellow-600 px-5 py-3 rounded-xl hover:bg-yellow-600 transition"
            >
              Upravit
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}