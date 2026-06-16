"use client";

import { useEffect } from "react";
import { useAudio } from "./AudioProvider";

export default function U8MusicLibrary({
    songs,
}: {
    songs: any[];
}) {
    const {
        setCurrentSong,
        setSongs,
    } = useAudio();

    useEffect(() => {
        setSongs(songs);
    }, [songs, setSongs]);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {songs.map((song) => (
                <div
                    key={song.id}
                    className="bg-black/80 border border-red-900 rounded-3xl overflow-hidden hover:border-red-500 transition duration-300"
                >

                    {song.cover_image && (
                        <img
                            src={song.cover_image}
                            alt={song.title}
                            className="w-full h-[500px] object-cover"
                        />
                    )}

                    <div className="p-6">

                        <p className="text-red-500 uppercase tracking-[0.25em] text-sm mb-3">
                            U8 Soundtrack
                        </p>

                        <h2 className="text-3xl font-black mb-6">
                            {song.title}
                        </h2>

                        {song.music_file && (
                            <button
                                onClick={() =>
                                    setCurrentSong({
                                        title: song.title,
                                        music_file: song.music_file,
                                        cover_image: song.cover_image,
                                    })
                                }
                                className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-bold mb-4"
                            >
                                ▶ Přehrát
                            </button>
                        )}

                        {song.youtube_url && (
                            <a
                                href={song.youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-red-500 hover:text-red-400 transition"
                            >
                                ▶ Poslechnout na YouTube
                            </a>
                        )}

                    </div>

                </div>
            ))}

        </div>
    );
}