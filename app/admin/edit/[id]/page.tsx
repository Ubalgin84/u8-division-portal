"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    loadArticle();
  }, []);

  async function loadArticle() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      alert("Článek nebyl nalezen.");
      return;
    }

    setTitle(data.title || "");
    setExcerpt(data.excerpt || "");
    setContent(data.content || "");

    setLoading(false);
  }

  async function saveArticle() {
    setSaving(true);

    const { error } = await supabase
      .from("articles")
      .update({
        title,
        excerpt,
        content,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert("Chyba při ukládání.");
      console.error(error);
      return;
    }

    alert("Článek uložen.");

    router.push("/admin");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Načítám článek...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-5xl mx-auto py-16 px-8">

        <h1 className="text-5xl font-black mb-10">
          Upravit článek
        </h1>

        <div className="space-y-8">

          <div>
            <label className="block mb-2 font-bold">
              Název
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-red-900 rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold">
              Perex
            </label>

            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full h-40 bg-black border border-red-900 rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold">
              Obsah článku
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[500px] bg-black border border-red-900 rounded-xl p-4"
            />
          </div>

          <div className="flex gap-4">

            <button
              onClick={saveArticle}
              disabled={saving}
              className="bg-red-600 px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition"
            >
              {saving ? "Ukládám..." : "Uložit změny"}
            </button>

            <button
              onClick={() => router.push("/admin")}
              className="border border-red-900 px-8 py-3 rounded-xl"
            >
              Zpět do Dashboardu
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}