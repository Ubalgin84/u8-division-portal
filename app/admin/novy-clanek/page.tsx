"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AdminPage() {
  const [nazev, setNazev] = useState("");
  const [datum, setDatum] = useState("");
  const [trat, setTrat] = useState("");
  const [start, setStart] = useState("");
  const [cil, setCil] = useState("");
  const [body, setBody] = useState("");
  const [shrnutí, setShrnuti] = useState("");
  const [vuz, setVuz] = useState("");
  const [incidenty, setIncidenty] = useState("");
  const [nejkolo, setNejkolo] = useState("");
  const [pitstopy, setPitstopy] = useState("");
  const [perex, setPerex] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [crew, setCrew] = useState("");
  const [weather, setWeather] = useState("");
  const [raceLength, setRaceLength] = useState("");
  const [teamReaction, setTeamReaction] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        if (!session) {
          router.push("/login");
          return;
        }
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const testConnection = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);
  };

  const [article, setArticle] = useState("");
  const generateTitle = () => {

    const startPos = Number(start);
    const finishPos = Number(cil);

    if (finishPos === 1) {
      return `Vítězství na ${trat}`;
    }

    if (startPos - finishPos >= 10) {
      return `Fantastický comeback na ${trat}`;
    }

    if (startPos - finishPos >= 5) {
      return `Skvělý posun pořadím na ${trat}`;
    }

    if (incidenty && Number(incidenty) >= 10) {
      return `Drama až do cíle na ${trat}`;
    }

    if (finishPos <= 3) {
      return `Pódium pro U8 Divisione na ${trat}`;
    }

    if (finishPos <= 10) {
      return `Cenné body ze závodu ${trat}`;
    }

    return `Závodní reportáž z ${trat}`;
  };
  const generateArticle = () => {
    const generatedTitle = generateTitle();
    setNazev(generatedTitle);
    setArticle(`

SILNÝ START

Posádka U8 Divisione vstoupila do závodu na okruhu ${trat} s vozem ${vuz}.

Start z ${start}. pozice znamenal náročný úvod závodu, ve kterém bylo potřeba rychle najít správné tempo a vyhnout se zbytečným chybám.

BOJ O POZICE

Díky konzistentnímu výkonu a dobře zvolené strategii se týmu podařilo postupně posouvat pořadím.

Během závodu tým absolvoval ${pitstopy} pit stopů a zaznamenal ${incidenty} incidentů.

DRAMA V ZÁVĚRU

Počasí: ${weather}

Délka závodu: ${raceLength}

Závěrečná část závodu rozhodovala o konečném výsledku. Každé správné rozhodnutí mělo vliv na boj o pozice a důležité body do šampionátu.

KLÍČOVÁ FAKTA

• Datum: ${datum}
• Trať: ${trat}
• Vůz: ${vuz}
• Posádka: ${crew}
• Start: ${start}
• Cíl: ${cil}
• Body: ${body}
• Pit stopy: ${pitstopy}
• Incidenty: ${incidenty}
• Nejrychlejší kolo: ${nejkolo}

SHRNUTÍ

${shrnutí}

U8 Divisione pokračuje v budování své pozice mezi předními týmy endurance scény.
`);
  };
  const generateAIArticle = async () => {
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nazev,
          trat,
          vuz,
          crew,
          start,
          cil,
          body,
          incidenty,
          weather,
          raceLength,
          shrnutí,
        }),
      });

      const data = await response.json();

      setNazev(data.title);
      setPerex(data.excerpt);
      setArticle(data.article);
      setTeamReaction(data.teamReaction);

    } catch (error) {
      console.error(error);
      alert("Chyba AI generování.");
    }
  };
  const copyArticle = () => {
    navigator.clipboard.writeText(article);
    alert("Článek byl zkopírován do schránky.");
  };

  const saveArticle = async () => {


    let imageUrl = "";

    if (imageFile) {

      const fileName =
        Date.now() + "-" + imageFile.name;

      const { error: uploadError } =
        await supabase.storage
          .from("articles")
          .upload(fileName, imageFile);
      console.log("UPLOAD ERROR:", uploadError);
      console.log("FILE:", imageFile);
      console.log("FILE NAME:", fileName);

      if (!uploadError) {

        imageUrl =
          supabase.storage
            .from("articles")
            .getPublicUrl(fileName)
            .data.publicUrl;
      }
    }
    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          title: nazev,

          slug: nazev
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-"),

          excerpt: perex,
          content: article,
          image_url: imageUrl,

          status: "published",
          race_date: datum,

          track: trat,
          car: vuz,
          crew: crew,

          start_pos: start,
          finish_pos: cil,

          points: body,
          incidents: incidenty,
          pit_stops: pitstopy,

          fastest_lap: nejkolo,
          weather: weather,
          race_length: raceLength,
          team_reaction: teamReaction,

        },
      ])
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert("Chyba při ukládání.");
      return;
    }

    alert("Článek uložen do databáze.");
  };
  if (loading) {
    return <main className="min-h-screen bg-black" />;
  }
  return (
    <main
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="bg-black/80 min-h-screen">

     

        <div className="h-24"></div>

        <section className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-red-500 uppercase tracking-[0.3em] mb-4">
            U8 Divisione
          </p>

          <h1 className="text-5xl font-black mb-10">
            U8 Redakce
          </h1>
          <button
            onClick={logout}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-xl font-bold mb-6"
          >
            Odhlásit
          </button>

          <div className="grid gap-4">
            <h2 className="text-2xl font-black text-red-500 mb-2">
              🏁 VSTUPNÍ DATA ZÁVODU
            </h2>

            <input
              placeholder="Název závodu"
              value={nazev}
              onChange={(e) => setNazev(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <textarea
              placeholder="Reakce týmu"
              value={teamReaction}
              onChange={(e) => setTeamReaction(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <textarea
              placeholder="Poznámky pro AI (volitelné)"
              value={shrnutí}
              onChange={(e) => setShrnuti(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4"
            />

            <input
              placeholder="Perex (krátký popis pro Novinky)"
              value={perex}
              onChange={(e) => setPerex(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Datum"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Trať"
              value={trat}
              onChange={(e) => setTrat(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Startovní pozice"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Cílová pozice"
              value={cil}
              onChange={(e) => setCil(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />
            <input
              placeholder="Počasí"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4"
            />
            <input
              placeholder="Délka závodu"
              value={raceLength}
              onChange={(e) => setRaceLength(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4"
            />

            <input
              placeholder="Vůz"
              value={vuz}
              onChange={(e) => setVuz(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />
            <input
              placeholder="Posádka"
              value={crew}
              onChange={(e) => setCrew(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Incidenty"
              value={incidenty}
              onChange={(e) => setIncidenty(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Nejrychlejší kolo"
              value={nejkolo}
              onChange={(e) => setNejkolo(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              placeholder="Pit stopy"
              value={pitstopy}
              onChange={(e) => setPitstopy(e.target.value)}
              className="bg-black/70 border border-red-900 rounded-xl p-4 focus:border-red-500 outline-none"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
              className="bg-black/70 border border-red-900 rounded-xl p-4"
            />
            <button
              onClick={generateArticle}
              className="bg-red-600 py-4 rounded-xl font-bold hover:bg-red-700 transition"
            >
              GENEROVAT ČLÁNEK
            </button>

            <button
              onClick={testConnection}
              className="bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              TEST SUPABASE
            </button>
            <button
              onClick={generateAIArticle}
              className="bg-purple-600 py-4 rounded-xl font-bold hover:bg-purple-700 transition"
            >
              🤖 AI REPORT
            </button>
            <h2 className="text-2xl font-black text-purple-500 mt-8">
              🤖 AI VÝSTUP
            </h2>

            <input
              placeholder="AI Titulek"
              value={nazev}
              readOnly
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-gray-400"
            />

            <input
              placeholder="AI Perex"
              value={perex}
              readOnly
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-gray-400"
            />

            <textarea
              placeholder="AI Reakce týmu"
              value={teamReaction}
              readOnly
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-gray-400 min-h-[120px]"
            />

            {article && (
              <button
                onClick={copyArticle}
                className="bg-zinc-800 py-4 rounded-xl font-bold hover:bg-zinc-700 transition"
              >
                KOPÍROVAT ČLÁNEK
              </button>
            )}

          </div>

          {article && (
            <>
              <h2 className="text-2xl font-black text-green-500 mt-10 mb-4">
                📰 NÁHLED ČLÁNKU
              </h2>

              <div className="border border-red-700 rounded-xl p-8 bg-zinc-950">
                <div className="whitespace-pre-wrap text-lg leading-8 text-gray-200">
                  {article}
                </div>
              </div>
            </>
          )}
          {teamReaction && (
            <div className="mt-8 border-t border-red-900 pt-6">
              <h2 className="text-2xl font-black mb-4">
                Reakce týmu
              </h2>

              <p className="text-gray-300 leading-8">
                {teamReaction}
              </p>
            </div>
          )}
          {article && (
            <button
              onClick={saveArticle}
              className="bg-green-600 py-4 rounded-xl font-bold hover:bg-green-700 transition"
            >
              ULOŽIT DO SUPABASE
            </button>
          )}


        </section>


      </div>
    </main>
  );
}