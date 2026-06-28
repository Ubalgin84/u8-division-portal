import { MessageSquareQuote } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

type Props = {
    article: any;
};

export default function RaceReaction({ article }: Props) {

    if (!article.team_reaction) {
        return null;
    }

    return (
        <div className="mt-16 border-t border-red-900 pt-10">

            <SectionHeading icon={MessageSquareQuote}>
                Reakce týmu
            </SectionHeading>

            <div className="border-l-4 border-red-500 pl-6 py-2">

                <p className="text-2xl italic leading-10 text-gray-200">
                    "{article.team_reaction}"
                </p>

                <p className="mt-4 text-sm uppercase tracking-widest text-red-500">
                    U8 Divisione
                </p>

            </div>

        </div>
    );
}