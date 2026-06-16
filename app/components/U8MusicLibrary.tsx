"use client";

import { useRef } from "react";

export default function U8MusicLibrary({
  songs,
}: {
  songs: any[];
}) {
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (
    e: React.SyntheticEvent<HTMLAudioElement>
  ) => {
    const audio = e.currentTarget;

    if (
      currentAudio.current &&
      currentAudio.current !== audio
    ) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }

    currentAudio.current = audio;
  };

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
              <audio
                controls
                className="w-full mb-4"
                onPlay={handlePlay}
              >
                <source
                  src={song.music_file}
                  type="audio/mpeg"
                />
              </audio>
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