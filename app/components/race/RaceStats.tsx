type Props = {
  article: any;
};

export default function RaceStats({ article }: Props) {
    return (
        <div className="mt-16 border-t border-red-900 pt-10">

            <h2 className="text-3xl font-black mb-8">
                Závodní data
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-10">

                <div className="bg-black/50 border border-red-900 rounded-xl p-6 text-center">
                    <p className="text-gray-500 uppercase text-sm">Start</p>
                    <p className="text-5xl font-black mt-2">
                        P{article.start_pos}
                    </p>
                </div>

                <div className="bg-black/50 border border-red-900 rounded-xl p-6 text-center">
                    <p className="text-gray-500 uppercase text-sm">Cíl</p>
                    <p className="text-5xl font-black mt-2 text-red-500">
                        P{article.finish_pos}
                    </p>
                </div>

                <div className="bg-black/50 border border-red-900 rounded-xl p-6 text-center">
                    <p className="text-gray-500 uppercase text-sm">Body</p>
                    <p className="text-5xl font-black mt-2">
                        {article.points}
                    </p>
                </div>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

                <div>
                    <p className="text-gray-500 uppercase text-sm">Datum</p>
                    <p className="text-xl font-bold">{article.race_date}</p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Trať</p>
                    <p className="text-xl font-bold">{article.track}</p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Vůz</p>
                    <p className="text-xl font-bold">{article.car}</p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Posádka</p>
                    <p className="text-xl font-bold">{article.crew}</p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Počasí</p>
                    <p className="text-xl font-bold">{article.weather}</p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Délka</p>
                    <p className="text-xl font-bold">{article.race_length}</p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Pit stopy</p>
                    <p className="text-xl font-bold">
                        {article.pit_stops || "Neuvedeno"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Nejlepší kolo</p>
                    <p className="text-xl font-bold">
                        {article.fastest_lap || "Neuvedeno"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Safety Car</p>
                    <p className="text-xl font-bold">
                        {article.safety_car || "Ne"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 uppercase text-sm">Změna počasí</p>
                    <p className="text-xl font-bold">
                        {article.weather_change || "Ne"}
                    </p>
                </div>

            </div>

        </div>
    );
}