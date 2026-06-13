"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function ClankyPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setArticles(data || []);
  }
  async function deleteArticle(id: number) {
    const confirmed = confirm(
      "Opravdu smazat článek?"
    );

    if (!confirmed) return;

    const res = await fetch(
      "/api/delete-article",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert("Mazání selhalo.");
      return;
    }

    setArticles((prev) =>
      prev.filter((article) => article.id !== id)
    );

    alert("Článek byl smazán.");
  }

  const filteredArticles = articles.filter((article) => {
    const title = article.title?.toLowerCase() || "";
    const track = article.track?.toLowerCase() || "";
    const query = search.toLowerCase();

    return title.includes(query) || track.includes(query);
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-10">

        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-red-500 uppercase tracking-[0.3em]">
              U8 Divisione
            </p>

            <h1 className="text-5xl font-black">
              Správa článků
            </h1>
          </div>

          <Link
            href="/admin"
            className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
          >
            Dashboard
          </Link>
        </div>

        <input
          type="text"
          placeholder="🔍 Hledat článek nebo trať..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-black border border-red-900 rounded-xl p-4 mb-8"
        />

        <div className="space-y-4">

          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="border border-red-900 rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {article.title}
                </h2>

                <p className="text-gray-500">
                  {article.track}
                </p>
              </div>

              <div className="flex gap-3">

                <a
                  href={`/novinky/${article.slug}`}
                  target="_blank"
                  className="border border-green-600 px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Otevřít
                </a>

                <a
                  href={`/admin/edit/${article.id}`}
                  className="border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Upravit
                </a>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Smazat
                </button>

              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="border border-red-900 rounded-xl p-8 text-center text-gray-400">
              Nebyly nalezeny žádné články.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}