import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

async function upravitZavod(
    id: string,
    formData: FormData
) {
    "use server";

    const supabase = await createClient();

    const data = {
        season: formData.get("season"),
        week: Number(formData.get("week")),
        series: formData.get("series"),
        track: formData.get("track"),
        race_date: formData.get("race_date"),
        race_time: formData.get("race_time"),
        status: formData.get("status"),
    };

    console.log("ID:", id);
    console.log("DATA:", data);

    const { error } = await supabase
        .from("race_calendar")
        .update(data)
        .eq("id", id);

    console.log("ERROR:", error);

    redirect("/admin/kalendar");
}

export default async function EditaceZavoduPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const supabase = await createClient();

    const { data: zavod } = await supabase
        .from("race_calendar")
        .select("*")
        .eq("id", id)
        .single();

    if (!zavod) {
        return (
            <main className="p-10 text-white">
                Závod nebyl nalezen.
            </main>
        );
    }

    return (
        <main className="p-10 text-white">

            <p className="text-red-500 uppercase tracking-[0.3em] text-sm">
                Race Calendar
            </p>

            <h1 className="text-5xl font-black mt-2 mb-10">
                Upravit závod
            </h1>

            <form
                action={upravitZavod.bind(null, id)}
                className="bg-black/70 border border-red-900 rounded-2xl p-8 space-y-6"
            >

                <div>
                    <label className="block text-gray-400 mb-2">
                        Sezóna
                    </label>

                    <input
                        name="season"
                        defaultValue={zavod.season}
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Týden
                    </label>

                    <input
                        name="week"
                        type="number"
                        defaultValue={zavod.week}
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Série
                    </label>

                    <input
                        name="series"
                        defaultValue={zavod.series}
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Trať
                    </label>

                    <input
                        name="track"
                        defaultValue={zavod.track}
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Datum závodu
                    </label>

                    <input
                        name="race_date"
                        type="date"
                        defaultValue={zavod.race_date}
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Čas závodu
                    </label>

                    <input
                        name="race_time"
                        defaultValue={zavod.race_time}
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Stav
                    </label>

                    <select
                        name="status"
                        defaultValue={zavod.status}
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    >
                        <option value="planned">
                            planned
                        </option>

                        <option value="upcoming">
                            upcoming
                        </option>

                        <option value="completed">
                            completed
                        </option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="border border-yellow-600 px-6 py-3 rounded-xl hover:bg-yellow-600 transition"
                >
                    Uložit změny
                </button>

            </form>

        </main>
    );
}
