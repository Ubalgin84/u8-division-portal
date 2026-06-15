"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminHudbaPage() {
    const [title, setTitle] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [coverUrl, setCoverUrl] = useState("");
    const [musicUrl, setMusicUrl] = useState("");

    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingMusic, setUploadingMusic] = useState(false);

    const [songs, setSongs] = useState<any[]>([]);

    useEffect(() => {
        loadSongs();
    }, []);

    async function loadSongs() {
        const { data } = await supabase
            .from("songs")
            .select("*")
            .order("id", { ascending: false });

        setSongs(data || []);
    }

    async function uploadCover(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        setUploadingCover(true);

        const fileName =
            Date.now() +
            "-" +
            file.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9.-]/g, "-");

        const { error } = await supabase.storage
            .from("song-covers")
            .upload(fileName, file);

        if (error) {
            alert("Upload coveru selhal.");
            console.error(error);
            setUploadingCover(false);
            return;
        }

        const {
            data: { publicUrl },
        } = supabase.storage
            .from("song-covers")
            .getPublicUrl(fileName);

        setCoverUrl(publicUrl);
        setUploadingCover(false);
    }

    async function uploadMusic(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        setUploadingMusic(true);

        const fileName =
            Date.now() +
            "-" +
            file.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9.-]/g, "-");

        const { error } = await supabase.storage
            .from("songs")
            .upload(fileName, file);

        if (error) {
            alert("Upload MP3 selhal.");
            console.error(error);
            setUploadingMusic(false);
            return;
        }

        const {
            data: { publicUrl },
        } = supabase.storage
            .from("songs")
            .getPublicUrl(fileName);

        setMusicUrl(publicUrl);
        setUploadingMusic(false);
    }

    async function saveSong() {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            alert("Nejste přihlášen.");
            return;
        }

        const response = await fetch(
            "/api/save-song",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    title,
                    coverImage: coverUrl,
                    musicFile: musicUrl,
                    youtubeUrl,
                }),
            }
        );

        const result = await response.json();

        if (!result.success) {
            alert(result.error || "Chyba.");
            return;
        }

        alert("Skladba uložena.");

        setTitle("");
        setYoutubeUrl("");
        setCoverUrl("");
        setMusicUrl("");

        loadSongs();
    }

    async function deleteSong(id: number) {
        const confirmed = confirm(
            "Opravdu smazat skladbu?"
        );

        if (!confirmed) return;

        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            alert("Nejste přihlášen.");
            return;
        }

        const response = await fetch(
            "/api/delete-song",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ id }),
            }
        );

        const result = await response.json();

        if (!result.success) {
            alert(result.error || "Chyba.");
            return;
        }

        loadSongs();
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto p-10">

                <div className="flex justify-between items-center mb-10">
                    <div>
                        <p className="text-red-500 uppercase tracking-[0.3em]">
                            U8 Divisione
                        </p>

                        <h1 className="text-5xl font-black">
                            Správa hudby
                        </h1>
                    </div>

                    <Link
                        href="/admin"
                        className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
                    >
                        Dashboard
                    </Link>
                </div>

                <div className="border border-red-900 rounded-2xl p-10 bg-black/70 mb-10">

                    <h2 className="text-3xl font-black mb-8">
                        Přidat skladbu
                    </h2>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Název skladby"
                        className="w-full mb-4 bg-black border border-red-900 rounded-xl p-4"
                    />

                    <input
                        value={youtubeUrl}
                        onChange={(e) =>
                            setYoutubeUrl(e.target.value)
                        }
                        placeholder="YouTube URL (volitelné)"
                        className="w-full mb-6 bg-black border border-red-900 rounded-xl p-4"
                    />

                    <div className="mb-6">
                        <p className="mb-2 font-bold">
                            Cover obrázek
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadCover}
                        />

                        {uploadingCover && (
                            <p className="mt-2">
                                Nahrávám cover...
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <p className="mb-2 font-bold">
                            MP3 soubor
                        </p>

                        <input
                            type="file"
                            accept=".mp3,audio/*"
                            onChange={uploadMusic}
                        />

                        {uploadingMusic && (
                            <p className="mt-2">
                                Nahrávám MP3...
                            </p>
                        )}
                    </div>

                    <button
                        onClick={saveSong}
                        className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold"
                    >
                        Uložit skladbu
                    </button>

                </div>

                <div className="border border-red-900 rounded-2xl p-10 bg-black/70">

                    <h2 className="text-3xl font-black mb-8">
                        Knihovna skladeb
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        {songs.map((song) => (
                            <div
                                key={song.id}
                                className="border border-red-900 rounded-xl overflow-hidden"
                            >

                                {song.cover_image && (
                                    <img
                                        src={song.cover_image}
                                        alt={song.title}
                                        className="w-full h-72 object-cover"
                                    />
                                )}

                                <div className="p-5">

                                    <h3 className="text-xl font-bold mb-4">
                                        {song.title}
                                    </h3>

                                    <button
                                        onClick={() =>
                                            deleteSong(song.id)
                                        }
                                        className="w-full border border-red-600 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        🗑️ Smazat
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </main>
    );
}