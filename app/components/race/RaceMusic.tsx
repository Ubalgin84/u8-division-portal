import { Music4 } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

type Props = {
    article: any;
};

export default function RaceMusic({ article }: Props) {
    if (!article.music_file && !article.music_url) {
        return null;
    }

    return (
        <div className="mt-16 border-t border-red-900 pt-10">
            <SectionHeading icon={Music4}>
                Soundtrack závodu
            </SectionHeading>

            {article.music_title && (
                <p className="text-xl font-bold text-red-500 mb-6">
                    {article.music_title}
                </p>
            )}

            {article.music_file && (
                <audio controls className="w-full mb-6">
                    <source
                        src={article.music_file}
                        type="audio/mpeg"
                    />
                    Váš prohlížeč nepodporuje audio přehrávač.
                </audio>
            )}

            {article.music_url && (
                <a
                    href={article.music_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700"
                >
                    ▶ Otevřít na YouTube
                </a>
            )}

        </div>
    );
}