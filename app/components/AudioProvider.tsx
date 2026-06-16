"use client";

import {
    createContext,
    useContext,
    useState,
} from "react";

type SongType = {
    id?: number;
    title: string;
    music_file: string;
    cover_image?: string;
};

type AudioContextType = {
    currentSong: SongType | null;
    setCurrentSong: (
        song: SongType | null
    ) => void;

    songs: SongType[];
    setSongs: (
        songs: SongType[]
    ) => void;
    nextSong: () => void;
    previousSong: () => void;

    nextSongTitle: string | null;
    shuffle: boolean;
    toggleShuffle: () => void;

    repeatMode: "off" | "playlist" | "song";
    toggleRepeat: () => void;

};

const AudioContext =
    createContext<AudioContextType | null>(null);

export function AudioProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [currentSong, setCurrentSong] =
        useState<SongType | null>(null);

    const [songs, setSongs] =
        useState<SongType[]>([]);

    const [shuffle, setShuffle] =
        useState(false);

    const [repeatMode, setRepeatMode] =
        useState<"off" | "playlist" | "song">(
            "off"
        );

    const toggleRepeat = () => {
        if (repeatMode === "off") {
            setRepeatMode("playlist");
        } else if (
            repeatMode === "playlist"
        ) {
            setRepeatMode("song");
        } else {
            setRepeatMode("off");
        }
    };
    const toggleShuffle = () => {
        setShuffle(!shuffle);
    };
    const nextSong = () => {
        if (!currentSong || songs.length === 0)
            return;

        if (shuffle) {
            const randomIndex =
                Math.floor(
                    Math.random() *
                    songs.length
                );

            setCurrentSong(
                songs[randomIndex]
            );

            return;
        }

        const currentIndex =
            songs.findIndex(
                (song) =>
                    song.music_file ===
                    currentSong.music_file
            );

        const isLastSong =
            currentIndex ===
            songs.length - 1;

        if (isLastSong) {

            if (repeatMode === "playlist") {
                setCurrentSong(
                    songs[0]
                );
            }

            return;
        }

        setCurrentSong(
            songs[currentIndex + 1]
        );
    };
    const previousSong = () => {
        if (!currentSong || songs.length === 0)
            return;

        const currentIndex =
            songs.findIndex(
                (song) =>
                    song.music_file ===
                    currentSong.music_file
            );

        const previousIndex =
            (currentIndex - 1 +
                songs.length) %
            songs.length;

        setCurrentSong(
            songs[previousIndex]
        );
    };
    const currentIndex =
        currentSong
            ? songs.findIndex(
                (song) =>
                    song.music_file ===
                    currentSong.music_file
            )
            : -1;

    const nextSongTitle =
        currentIndex >= 0 &&
            currentIndex < songs.length - 1
            ? songs[currentIndex + 1]
                ?.title || null
            : repeatMode === "playlist"
                ? songs[0]?.title || null
                : null;

    return (
        <AudioContext.Provider
            value={{
                currentSong,
                setCurrentSong,

                songs,
                setSongs,

                nextSong,
                previousSong,

                nextSongTitle,

                shuffle,
                toggleShuffle,

                repeatMode,
                toggleRepeat,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context =
        useContext(AudioContext);

    if (!context) {
        throw new Error(
            "useAudio must be used inside AudioProvider"
        );
    }

    return context;
}