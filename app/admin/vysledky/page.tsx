"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function ResultsPage() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const [form, setForm] = useState({
        race_name: "",
        track: "",
        car: "",
        crew: "",
        start_pos: "",
        finish_pos: "",
        points: "",
        incidents: "",
        race_length: "",
        weather: "",
        race_date: "",
    });
    useEffect(() => {
        loadResults();
    }, []);

    async function loadResults() {
        const { data } = await supabase
            .from("results")
            .select("*")
            .order("id", { ascending: false });

        setResults(data || []);
    }

    async function saveResult() {
        setLoading(true);

        const { error } = await supabase
            .from("results")
            .insert({
                race_name: form.race_name,
                track: form.track,
                car: form.car,
                crew: form.crew,
                start_pos: Number(form.start_pos),
                finish_pos: Number(form.finish_pos),
                points: Number(form.points),
                incidents: Number(form.incidents),
                race_length: form.race_length,
                weather: form.weather,
                race_date: form.race_date,
            });

        setLoading(false);

        if (error) {
            console.error(error);
            alert("Uložení selhalo.");
            return;
        }
        alert("Výsledek uložen.");

        loadResults();
    }
    async function deleteResult(id: number) {
        const confirmed = confirm(
            "Opravdu smazat výsledek?"
        );

        if (!confirmed) return;

        const { error } = await supabase
            .from("results")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Mazání selhalo.");
            return;
        }

        loadResults();
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto p-10">

                <h1 className="text-5xl font-black mb-10">
                    🏁 Správa výsledků
                </h1>

                <div className="grid gap-4">

                    <input
                        placeholder="Název závodu"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, race_name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Trať"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, track: e.target.value })
                        }
                    />

                    <input
                        placeholder="Vůz"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, car: e.target.value })
                        }
                    />

                    <input
                        placeholder="Posádka"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, crew: e.target.value })
                        }
                    />

                    <input
                        placeholder="Startovní pozice"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, start_pos: e.target.value })
                        }
                    />

                    <input
                        placeholder="Cílová pozice"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, finish_pos: e.target.value })
                        }
                    />

                    <input
                        placeholder="Body"
                        className="p-4 bg-black border border-red-900 rounded-xl"
                        onChange={(e) =>
                            setForm({ ...form, points: e.target.value })
                        }
                    />

                    <button
                        onClick={saveResult}
                        disabled={loading}
                        className="bg-red-600 p-4 rounded-xl font-bold"
                    >
                        {loading
                            ? "Ukládám..."
                            : "💾 Uložit výsledek"}
                    </button>

                </div>
                <div className="mt-12 border border-red-900 rounded-2xl p-8">

                    <h2 className="text-3xl font-black mb-8">
                        Poslední výsledky
                    </h2>

                    <div className="space-y-4">

                        {results.map((result) => (

                            <div
                                key={result.id}
                                className="border border-red-900 rounded-xl p-5 flex justify-between items-center"
                            >
                                <div>

                                    <h3 className="font-bold text-lg">
                                        {result.race_name}
                                    </h3>

                                    <p className="text-gray-500">
                                        {result.track}
                                    </p>

                                </div>

                                <div className="flex gap-4 items-center flex-wrap">

                                    <span className="text-red-500 font-black">
                                        P{result.finish_pos}
                                    </span>

                                    <span>
                                        {result.points} bodů
                                    </span>

                                    {result.article_slug ? (
                                        <span className="text-green-500 font-bold">
                                            ✅ Report vytvořen
                                        </span>
                                    ) : (
                                        <span className="text-yellow-500 font-bold">
                                            ⚠ Bez reportu
                                        </span>
                                    )}

                                    <a
                                        href={`/admin/vysledky/edit/${result.id}`}
                                        className="border border-yellow-600 px-4 py-2 rounded-lg"
                                    >
                                        Upravit
                                    </a>

                                    <button
                                        onClick={() => deleteResult(result.id)}
                                        className="border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        🗑 Smazat
                                    </button>

                                    <a
                                        href={`/admin/ai-report?id=${result.id}`}
                                        className={`px-4 py-2 rounded-lg border ${result.article_slug
                                                ? "border-green-600 text-green-500"
                                                : "border-yellow-600 text-yellow-500"
                                            }`}
                                    >
                                        {result.article_slug
                                            ? "✏️ Upravit report"
                                            : "🤖 Vytvořit report"}
                                    </a>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </main>
    );
}