"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";

export default function EditResultPage() {
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        race_name: "",
        track: "",
        car: "",
        crew: "",
        start_pos: "",
        finish_pos: "",
        points: "",
    });

    useEffect(() => {
        loadResult();
    }, []);

    async function loadResult() {
        const { data } = await supabase
            .from("results")
            .select("*")
            .eq("id", id)
            .single();

        if (!data) {
            alert("Výsledek nenalezen.");
            return;
        }

        setForm({
            race_name: data.race_name || "",
            track: data.track || "",
            car: data.car || "",
            crew: data.crew || "",
            start_pos: String(data.start_pos || ""),
            finish_pos: String(data.finish_pos || ""),
            points: String(data.points || ""),
        });

        setLoading(false);
    }

    async function saveResult() {
        setSaving(true);

        const { error } = await supabase
            .from("results")
            .update({
                race_name: form.race_name,
                track: form.track,
                car: form.car,
                crew: form.crew,
                start_pos: Number(form.start_pos),
                finish_pos: Number(form.finish_pos),
                points: Number(form.points),
            })
            .eq("id", id);

        setSaving(false);

        if (error) {
            console.error(error);
            alert("Uložení selhalo.");
            return;
        }

        alert("Výsledek uložen.");

        router.push("/admin/vysledky");
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-black text-white p-10">
                Načítám...
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto p-10">

                <h1 className="text-5xl font-black mb-10">
                    🏁 Upravit výsledek
                </h1>

                <div className="grid gap-4">

                    <input
                        value={form.race_name}
                        onChange={(e) =>
                            setForm({ ...form, race_name: e.target.value })
                        }
                        className="p-4 bg-black border border-red-900 rounded-xl"
                    />

                    <input
                        value={form.track}
                        onChange={(e) =>
                            setForm({ ...form, track: e.target.value })
                        }
                        className="p-4 bg-black border border-red-900 rounded-xl"
                    />

                    <input
                        value={form.car}
                        onChange={(e) =>
                            setForm({ ...form, car: e.target.value })
                        }
                        className="p-4 bg-black border border-red-900 rounded-xl"
                    />

                    <input
                        value={form.crew}
                        onChange={(e) =>
                            setForm({ ...form, crew: e.target.value })
                        }
                        className="p-4 bg-black border border-red-900 rounded-xl"
                    />

                    <input
                        value={form.start_pos}
                        onChange={(e) =>
                            setForm({ ...form, start_pos: e.target.value })
                        }
                        className="p-4 bg-black border border-red-900 rounded-xl"
                    />

                    <input
                        value={form.finish_pos}
                        onChange={(e) =>
                            setForm({ ...form, finish_pos: e.target.value })
                        }
                        className="p-4 bg-black border border-red-900 rounded-xl"
                    />

                    <input
                        value={form.points}
                        onChange={(e) =>
                            setForm({ ...form, points: e.target.value })
                        }
                        className="p-4 bg-black border border-red-900 rounded-xl"
                    />

                    <button
                        onClick={saveResult}
                        disabled={saving}
                        className="bg-red-600 p-4 rounded-xl font-bold"
                    >
                        {saving
                            ? "Ukládám..."
                            : "💾 Uložit změny"}
                    </button>

                </div>

            </div>
        </main>
    );
}