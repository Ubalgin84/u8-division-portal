"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "./AudioProvider";

export default function GlobalAudioPlayer() {
    const {
        currentSong,
        setCurrentSong,
        nextSong,
        previousSong,
    } = useAudio();

    const audioRef = useRef<HTMLAudioElement>(null);

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [previousVolume, setPreviousVolume] =
        useState(0.5);

    useEffect(() => {
        const savedVolume =
            localStorage.getItem("u8-volume");

        if (savedVolume) {
            const volumeValue =
                Number(savedVolume);

            setVolume(volumeValue);

            if (audioRef.current) {
                audioRef.current.volume =
                    volumeValue;
            }
        }
    }, []);

    useEffect(() => {
        if (
            currentSong &&
            audioRef.current
        ) {
            audioRef.current.src =
                currentSong.music_file;

            audioRef.current.play();
            audioRef.current.volume = volume;

            setPlaying(true);
        }
    }, [currentSong]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true);
        }

    };
    const stopSong = () => {
        if (!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        setPlaying(false);
        setCurrentTime(0);
        setProgress(0);
    };

    const closePlayer = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }

        setCurrentSong(null);
        setPlaying(false);
    };
    const changeVolume = (
        value: number
    ) => {
        if (value > 0) {
            setPreviousVolume(value);
        }

        setVolume(value);

        localStorage.setItem(
            "u8-volume",
            value.toString()
        );

        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };
    const toggleMute = () => {
        if (volume === 0) {
            changeVolume(previousVolume);
        } else {
            setPreviousVolume(volume);
            changeVolume(0);
        }
    };

    const formatTime = (
        seconds: number
    ) => {
        if (!seconds) return "0:00";

        const mins = Math.floor(
            seconds / 60
        );

        const secs = Math.floor(
            seconds % 60
        );

        return `${mins}:${secs
            .toString()
            .padStart(2, "0")}`;
    };
    const seekSong = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!audioRef.current) return;

        const rect =
            e.currentTarget.getBoundingClientRect();

        const clickX =
            e.clientX - rect.left;

        const percent =
            clickX / rect.width;

        audioRef.current.currentTime =
            percent *
            audioRef.current.duration;
    };

    if (!currentSong) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[9999] bg-black/95 border-t border-red-600 backdrop-blur-md">

            <audio
                ref={audioRef}
                onTimeUpdate={() => {
                    if (!audioRef.current) return;

                    setCurrentTime(
                        audioRef.current.currentTime
                    );

                    setProgress(
                        (audioRef.current.currentTime /
                            audioRef.current.duration) *
                        100 || 0
                    );
                }}
                onLoadedMetadata={() => {
                    if (!audioRef.current) return;

                    setDuration(
                        audioRef.current.duration
                    );
                }}
                onEnded={() => {
                    setPlaying(false);
                    nextSong();
                }}
            />

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center gap-4">

                    {currentSong.cover_image && (
                        <img
                            src={currentSong.cover_image}
                            alt={currentSong.title}
                            className="w-20 h-20 object-cover rounded-xl border border-red-700"
                        />
                    )}

                    <div className="flex-1">

                        <p className="text-red-500 uppercase tracking-[0.3em] text-xs">
                            U8 SOUNDTRACK
                        </p>

                        <h3 className="text-xl font-black">
                            {currentSong.title}
                        </h3>

                        <div className="mt-3">

                            <div
                                className="w-full h-2 bg-gray-800 rounded-full overflow-hidden cursor-pointer"
                                onClick={seekSong}
                            >

                                <div
                                    className="h-full bg-red-600 transition-all"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />

                            </div>

                            <div className="flex justify-between text-xs text-gray-400 mt-1">

                                <span>
                                    {formatTime(
                                        currentTime
                                    )}
                                </span>

                                <span>
                                    {formatTime(duration)}
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={previousSong}
                            className="border border-red-600 hover:bg-red-600 px-4 py-3 rounded-xl transition"
                        >
                            ⏮
                        </button>

                        <button
                            onClick={togglePlay}
                            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold transition"
                        >
                            {playing ? "⏸" : "▶"}
                        </button>

                        <button
                            onClick={stopSong}
                            className="border border-red-600 hover:bg-red-600 px-4 py-3 rounded-xl transition"
                        >
                            ⏹
                        </button>

                        <button
                            onClick={nextSong}
                            className="border border-red-600 hover:bg-red-600 px-4 py-3 rounded-xl transition"
                        >
                            ⏭
                        </button>
                        <button
                            onClick={toggleMute}
                            className="border border-red-600 hover:bg-red-600 px-4 py-3 rounded-xl transition"
                        >
                            {volume === 0 ? "🔇" : "🔊"}
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) =>
                                changeVolume(
                                    Number(e.target.value)
                                )
                            }
                            className="w-24 accent-red-600"
                        />

                        <button
                            onClick={closePlayer}
                            className="border border-red-600 hover:bg-red-600 px-4 py-3 rounded-xl transition"
                        >
                            ✕
                        </button>

                    </div>
                </div>

            </div>

        </div>
    );
}