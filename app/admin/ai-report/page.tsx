"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { ChangeEvent } from "react";

function AIReportContent() {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const searchParams = useSearchParams();
    const resultId = searchParams.get("id");

    const [form, setForm] = useState({
        nazev: "",
        trat: "",
        vuz: "",
        crew: "",

        start: "",
        cil: "",
        body: "",
        incidenty: "",

        weather: "",
        raceLength: "",
        raceDate: "",

        pitStops: "",
        bestLap: "",
        safetyCar: "",
        weatherChange: "",

        shrnutí: "",
        featuredImage: "",
        musicTitle: "",
        musicUrl: "",
        musicFile: "",
    });
    useEffect(() => {
        if (resultId) {
            loadResult();
        }
    }, [resultId]);

    async function loadResult() {
        const { data } = await supabase
            .from("results")
            .select("*")
            .eq("id", resultId)
            .single();

        if (!data) return;

        setForm({
            nazev: data.race_name || "",
            trat: data.track || "",
            vuz: data.car || "",
            crew: data.crew || "",
            raceDate: data.race_date || "",

            start: String(data.start_pos || ""),
            cil: String(data.finish_pos || ""),
            body: String(data.points || ""),
            incidenty: String(data.incidents || ""),

            weather: data.weather || "",
            raceLength: data.race_length || "",

            pitStops: "",
            bestLap: "",
            safetyCar: "",
            weatherChange: "",

            shrnutí: "",
            featuredImage: "",
            musicTitle: "",
            musicUrl: "",
            musicFile: "",
        });
    }

    async function uploadImage(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
            .from("articles")
            .upload(fileName, file);

        if (error) {
            console.error(error);
            alert("Upload obrázku selhal.");
            return;
        }

        const { data } = supabase.storage
            .from("articles")
            .getPublicUrl(fileName);

        setForm((prev) => ({
            ...prev,
            featuredImage: data.publicUrl,
        }));

        alert("Obrázek nahrán.");
    }
    async function uploadMusic(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) return;
        const {
            data: { session },
        } = await supabase.auth.getSession();

        console.log("SESSION:", session);

        if (!session) {
            alert("Nejste přihlášen.");
            return;
        }

        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
            .from("music")
            .upload(fileName, file);

        if (error) {
            console.error("MUSIC ERROR:", error);

            alert(
                JSON.stringify(error, null, 2)
            );

            return;
        }

        const { data } = supabase.storage
            .from("music")
            .getPublicUrl(fileName);

        setForm((prev) => ({
            ...prev,
            musicFile: data.publicUrl,
        }));

        alert("Hudba nahrána.");
    }


    async function generateReport() {
        if (
            !form.nazev ||
            !form.trat ||
            !form.vuz ||
            !form.crew ||
            !form.start ||
            !form.cil ||
            !form.body
        ) {
            alert(
                "Vyplň všechna povinná pole:\n\n" +
                "- Název závodu\n" +
                "- Trať\n" +
                "- Vůz\n" +
                "- Posádka\n" +
                "- Startovní pozice\n" +
                "- Cílová pozice\n" +
                "- Body"
            );

            return;
        }
        setLoading(true);
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            alert("Nejste přihlášen.");
            setLoading(false);
            return;
        }

        const res = await fetch("/api/generate-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (!res.ok) {
            alert(data.error || "Generování selhalo");
            setLoading(false);
            return;
        }


        setResult(data);
        setLoading(false);
    }

    async function publishArticle() {
        if (!result) return;

        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            alert("Nejste přihlášen.");
            return;
        }

        const res = await fetch("/api/save-ai-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({
                ...result,
                resultId,
                featuredImage: form.featuredImage,
                track: form.trat,
                car: form.vuz,
                start: form.start,
                finish: form.cil,
                points: form.body,
                incidents: form.incidenty,
                weather: form.weather,
                raceLength: form.raceLength,
                crew: form.crew,
                raceDate: form.raceDate,
                musicTitle: form.musicTitle,
                musicUrl: form.musicUrl,
                musicFile: form.musicFile,

            }),
        });

        const data = await res.json();

        if (!data.success) {
            console.error("SAVE ERROR:", data);

            alert(
                "Publikace selhala.\n\n" +
                JSON.stringify(data, null, 2)
            );

            return;
        }

        alert("Článek publikován.");

        window.location.href = "/admin";
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto p-10">

                <h1 className="text-5xl font-black mb-10">
                    🤖 AI Report Center
                </h1>

                <div className="grid gap-4">
                    <h2 className="text-2xl font-black text-red-500 mb-2">
                        Základní data
                    </h2>

                    <input
                        value={form.nazev}
                        placeholder="Název závodu"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, nazev: e.target.value })
                        }
                    />
                    <input
                        value={form.raceDate}
                        placeholder="Datum závodu"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, raceDate: e.target.value })
                        }
                    />

                    <input
                        value={form.trat}
                        placeholder="trat"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, trat: e.target.value })
                        }
                    />

                    <input
                        value={form.vuz}
                        placeholder="Vůz"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, vuz: e.target.value })
                        }
                    />

                    <input
                        value={form.crew}
                        placeholder="Posádka"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, crew: e.target.value })
                        }
                    />
                    <h2 className="text-2xl font-black text-red-500 mt-4 mb-2">
                        Výsledek
                    </h2>

                    <input
                        value={form.start}
                        placeholder="Startovní pozice"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, start: e.target.value })
                        }
                    />

                    <input
                        value={form.cil}
                        placeholder="Cílová pozice"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, cil: e.target.value })
                        }
                    />
                    <h2 className="text-2xl font-black text-red-500 mt-4 mb-2">
                        Podmínky závodu
                    </h2>

                    <input
                        value={form.body}
                        placeholder="Body"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, body: e.target.value })
                        }
                    />

                    <input
                        value={form.incidenty}
                        placeholder="Incidenty"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, incidenty: e.target.value })
                        }
                    />

                    <input
                        value={form.weather}
                        placeholder="Počasí"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, weather: e.target.value })
                        }
                    />

                    <input
                        value={form.raceLength}
                        placeholder="Délka závodu"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, raceLength: e.target.value })
                        }
                    />
                    <h2 className="text-2xl font-black text-red-500 mt-4 mb-2">
                        Strategie
                    </h2>

                    <input
                        value={form.pitStops}
                        placeholder="Počet pit stopů"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, pitStops: e.target.value })
                        }
                    />

                    <input
                        value={form.bestLap}
                        placeholder="Nejlepší kolo"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, bestLap: e.target.value })
                        }
                    />

                    <input
                        value={form.safetyCar}
                        placeholder="Safety Car (Ano/Ne)"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, safetyCar: e.target.value })
                        }
                    />

                    <input
                        value={form.weatherChange}
                        placeholder="Změna počasí (Ano/Ne)"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, weatherChange: e.target.value })
                        }
                    />

                    <h2 className="text-2xl font-black text-red-500 mt-4 mb-2">
                        Poznámky pro AI
                    </h2>

                    <textarea
                        value={form.shrnutí}
                        placeholder="Souboje, strategie, kontakty, déšť, poškození, důležité momenty závodu..."
                        className="p-4 h-40 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, shrnutí: e.target.value })
                        }
                    />
                    <div className="border border-red-900 rounded-xl p-4">

                        <h2 className="text-2xl font-black text-red-500 mb-4">
                            Obrázek článku
                        </h2>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadImage}
                            className="w-full p-3 bg-black border border-red-900 rounded-xl"
                        />

                        {form.featuredImage && (
                            <div className="mt-4">

                                <img
                                    src={form.featuredImage}
                                    alt="Náhled obrázku"
                                    className="rounded-xl border border-red-900 max-h-80"
                                />

                                <p className="mt-2 text-green-500 font-bold">
                                    ✅ Obrázek úspěšně nahrán
                                </p>

                            </div>
                        )}

                    </div>
                    <div className="border border-red-900 rounded-xl p-4">

                        <h2 className="text-2xl font-black text-red-500 mb-4">
                            🎵 Soundtrack článku
                        </h2>

                        <input
                            value={form.musicTitle}
                            placeholder="Název skladby"
                            className="w-full p-4 mb-4 bg-black border border-red-900 rounded-xl"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    musicTitle: e.target.value,
                                })
                            }
                        />

                        <input
                            value={form.musicUrl}
                            placeholder="YouTube URL"
                            className="w-full p-4 bg-black border border-red-900 rounded-xl"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    musicUrl: e.target.value,
                                })
                            }
                        />
                        <input
                            type="file"
                            accept=".mp3,audio/*"
                            onChange={uploadMusic}
                            className="w-full p-3 mt-4 bg-black border border-red-900 rounded-xl"
                        />

                        {form.musicFile && (
                            <p className="mt-3 text-green-500 font-bold">
                                ✅ Soundtrack nahrán
                            </p>
                        )}

                    </div>

                    <button
                        onClick={generateReport}
                        disabled={loading}
                        className="bg-red-600 p-4 rounded-xl font-bold"
                    >
                        {loading
                            ? "Generuji..."
                            : "🤖 Generovat report"}
                    </button>

                </div>

                {result && (
                    <div className="mt-10 border border-red-900 rounded-xl p-6">

                        <h2 className="text-3xl font-black mb-4">
                            {result.title}
                        </h2>

                        <p className="text-gray-400 mb-6">
                            {result.excerpt}
                        </p>

                        <div className="whitespace-pre-wrap">
                            {result.article}
                        </div>
                        {result.teamReaction && (
                            <div className="mt-8 border border-red-900 rounded-xl p-6">
                                <h3 className="text-xl font-black mb-3">
                                    Reakce týmu
                                </h3>

                                <p>{result.teamReaction}</p>
                            </div>

                        )}
                        <button
                            onClick={publishArticle}
                            className="mt-8 bg-green-600 px-8 py-4 rounded-xl font-black hover:bg-green-700 transition"
                        >
                            💾 Publikovat na web
                        </button>

                    </div>

                )}

            </div>
        </main>
    );
}
export default function AIReportPage() {
    return (
        <Suspense fallback={<div>Načítám...</div>}>
            <AIReportContent />
        </Suspense>
    );
}