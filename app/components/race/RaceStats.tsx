import RaceDataCard from "./RaceDataCard";
import { Flag } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

type Props = {
    article: any;
};

export default function RaceStats({ article }: Props) {
    return (
        <div className="mt-16 border-t border-red-900 pt-10">

            <SectionHeading icon={Flag}>
                Závodní data
            </SectionHeading>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

                <RaceDataCard
                    label="Datum"
                    value={article.race_date}
                />

                <RaceDataCard
                    label="Trať"
                    value={article.track}
                />

                <RaceDataCard
                    label="Vůz"
                    value={article.car}
                />

                <RaceDataCard
                    label="Posádka"
                    value={article.crew}
                />

                <RaceDataCard
                    label="Počasí"
                    value={article.weather}
                />

                <RaceDataCard
                    label="Délka"
                    value={article.race_length}
                />

                <RaceDataCard
                    label="Pit stopy"
                    value={article.pit_stops || "Neuvedeno"}
                />

                <RaceDataCard
                    label="Nejlepší kolo"
                    value={article.fastest_lap || "Neuvedeno"}
                />

                <RaceDataCard
                    label="Safety Car"
                    value={article.safety_car || "Ne"}
                />

                <RaceDataCard
                    label="Změna počasí"
                    value={article.weather_change || "Ne"}
                />
            </div>

        </div>
    );
}