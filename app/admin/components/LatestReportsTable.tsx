import Link from "next/link";

interface LatestReportsTableProps {
  articles: any[];
}

export default function LatestReportsTable({
  articles,
}: LatestReportsTableProps) {
  return (
    <section className="bg-black/70 border border-red-900 rounded-2xl p-8 mb-10">

      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-red-500 uppercase tracking-[0.3em] text-sm">
            Reports Center
          </p>

          <h2 className="text-3xl font-black mt-2">
            Poslední reporty
          </h2>
        </div>

        <div className="text-gray-500 text-sm">
          {articles.length} reportů
        </div>
      </div>

      <div className="space-y-4">

        {articles.map((article) => (

          <div
            key={article.id}
            className="border border-red-900 rounded-xl p-5 hover:border-red-500 transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div className="flex-1">

                <h3 className="text-lg font-bold mb-1">
                  {article.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">

                  <span>
                    📍 {article.track || "Unknown Track"}
                  </span>

                  <span>
                    🤖 AI Report
                  </span>

                </div>

              </div>

              <div className="flex gap-2">

                <a
                  href={`/novinky/${article.slug}`}
                  target="_blank"
                  className="border border-green-600 px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Open
                </a>

                <Link
                  href={`/admin/edit/${article.id}`}
                  className="border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}