import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

async function ulozitZavod(formData: FormData) {
    "use server";

    const supabase = await createClient();
    const datum = formData.get("race_date");
    const cas = formData.get("race_time");

    const raceDatetime = `${datum}T${cas}:00`;

    await supabase
        .from("race_calendar")
        .insert({
            season: formData.get("season"),
            week: Number(formData.get("week")),
            series: formData.get("series"),
            track: formData.get("track"),
            race_date: formData.get("race_date"),
            race_time: formData.get("race_time"),
            status: formData.get("status"),
            race_datetime: raceDatetime,
        });

    redirect("/admin/kalendar");
}
export default function NovyZavodPage() {
    return (
        <main className="p-10 text-white">

            <p className="text-red-500 uppercase tracking-[0.3em] text-sm">
                Race Calendar
            </p>

            <h1 className="text-5xl font-black mt-2 mb-10">
                Přidat závod
            </h1>

            <form
                action={ulozitZavod}
                className="bg-black/70 border border-red-900 rounded-2xl p-8 space-y-6"
            >

                <div>
                    <label className="block text-gray-400 mb-2">
                        Sezóna
                    </label>

                    <input
                        name="season"
                        type="text"
                        placeholder="Season 3 2026"
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
                        placeholder="1"
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Série
                    </label>

                    <input
                        name="series"
                        type="text"
                        placeholder="IMSA"
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Trať
                    </label>

                    <input
                        name="track"
                        type="text"
                        placeholder="Watkins Glen"
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
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Čas závodu
                    </label>

                    <input
                        name="race_time"
                        type="text"
                        placeholder="20:00"
                        className="w-full bg-black border border-red-900 rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Stav
                    </label>

                    <select
                        name="status"
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
                    className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
                >
                    Uložit závod
                </button>

            </form>

        </main>
    );
}