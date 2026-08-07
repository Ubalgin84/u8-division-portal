"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import { uploadImageToBucket } from "../../../../lib/uploadImage";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
      console.error("ARTICLE LOAD FAILED:", error);
      alert("Článek nebyl nalezen.");
      return;
    }

    setTitle(data.title || "");
    setExcerpt(data.excerpt || "");
    setContent(data.content || "");
    setImageUrl(data.image_url || data.featured_image || "");

    setLoading(false);
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadingImage(true);

    const { url, error } = await uploadImageToBucket("articles", file);

    setUploadingImage(false);

    if (error || !url) {
      console.error("ARTICLE IMAGE UPLOAD FAILED:", error);
      alert(`Nahrání obrázku selhalo:\n\n${error}`);
      return;
    }

    setImageUrl(url);
  }

  async function saveArticle() {
    setSaving(true);

    const { error } = await supabase
      .from("articles")
      .update({
        title,
        excerpt,
        content,
        image_url: imageUrl,
        featured_image: imageUrl,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.error("ARTICLE UPDATE FAILED:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        raw: error,
      });

      alert(`Chyba při ukládání článku:\n\n${error.message}`);
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

          <div>
            <label className="block mb-2 font-bold">
              Titulní obrázek
            </label>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Náhled titulního obrázku"
                className="mb-4 max-h-64 rounded-xl border border-red-900"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploadingImage}
              className="w-full bg-black border border-red-900 rounded-xl p-4"
            />

            {uploadingImage && (
              <p className="mt-2 text-gray-400">Nahrávám obrázek...</p>
            )}
          </div>

          <div className="flex gap-4">

            {/* Blocked during upload so Save can't fire with a stale imageUrl before the new one lands */}
            <button
              onClick={saveArticle}
              disabled={saving || uploadingImage}
              className="bg-red-600 px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50"
            >
              {saving
                ? "Ukládám..."
                : uploadingImage
                ? "Čekejte, nahrávám obrázek..."
                : "Uložit změny"}
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
