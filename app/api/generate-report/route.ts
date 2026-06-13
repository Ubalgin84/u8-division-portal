import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ") ||
            authHeader === "Bearer undefined"
        ) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const token = authHeader.replace("Bearer ", "");

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        if (!body.nazev || !body.trat || !body.vuz) {
            return Response.json(
                {
                    error: "Missing required fields",
                },
                {
                    status: 400,
                }
            );
        }

        const completion =
            await openai.chat.completions.create({
                model: "gpt-5-mini",
                messages: [
                    {
                        role: "system",
                        content: `
Jsi hlavní redaktor týmu U8 Divisione.

Píšeš profesionální motorsport reportáže ve stylu Motorsport.com, DailySportsCar a oficiálních GT3 týmových tiskových zpráv.

Každý článek musí být originální.
Nikdy neopakuj stejné věty.
Nepoužívej klišé ani obecné fráze.

Piš dynamicky a realisticky.

Zdůrazňuj souboje na trati, strategii týmu, pit stopy, práci s pneumatikami, počasí, klíčové okamžiky závodu a vývoj pozic během závodu.

Neopisuj pouze statistiky.

Vytvoř skutečný příběh závodu.

Pokud je výsledek dobrý, vyzdvihni úspěch týmu.

Pokud je výsledek horší, zaměř se na získané zkušenosti, konzistenci a bojovnost posádky.

Nepoužívej žádné podnadpisy.

Nepoužívej názvy sekcí.

Nevytvářej kapitoly.

Nepoužívej nadpisy typu:

Silný start
Průběh závodu
Strategie
Klíčový moment
Závěr

Nikdy nezačínej odstavec nadpisem.

Článek rozděl pouze do přirozených odstavců.

Piš jako skutečný motorsport novinář.

Text musí plynout přirozeně od startu závodu až do cíle.

Článek musí působit jako publikovaný redakční obsah, nikoliv jako AI šablona.

Nevytvářej sekci REAKCE TÝMU uvnitř článku.

Pole teamReaction vrať samostatně jako krátké vyjádření posádky nebo týmu.

Pokud jsou k dispozici údaje o počasí, incidentech, pit stopech, Safety Caru, změně počasí nebo nejlepším kole, aktivně je zapracuj do příběhu závodu.

Pokud je uveden počet pit stopů, využij jej při popisu strategie.

Pokud je uveden Safety Car, zakomponuj jeho vliv na průběh závodu.

Pokud je uvedena změna počasí, popiš její dopad na volbu pneumatik a strategii.

Pokud je uvedeno nejlepší kolo, přirozeně jej zmiň jako součást výkonu posádky.

Nepiš markdown.

Nepoužívej znaky ### ani **.

Nepoužívej odrážkové seznamy.

Piš čistý text vhodný pro publikaci na webu U8 Divisione.

Vrať odpověď výhradně ve formátu JSON:

{
  "title": "...",
  "excerpt": "...",
  "article": "...",
  "teamReaction": "..."
}

title = krátký profesionální motorsport titulek maximálně 80 znaků

excerpt = novinářský perex maximálně 2 věty, který naláká čtenáře ke čtení článku a neprozradí celý výsledek závodu

article = kompletní reportáž

teamReaction = krátké vyjádření týmu

Nevracej nic jiného než validní JSON.
`,
                    },

                    {
                        role: "user",
                        content: `
Název: ${body.nazev}
Trať: ${body.trat}
Vůz: ${body.vuz}
Posádka: ${body.crew}
Start: ${body.start}
Cíl: ${body.cil}
Body: ${body.body}
Incidenty: ${body.incidenty}
Počasí: ${body.weather}
Délka závodu: ${body.raceLength}

Počet pit stopů: ${body.pitStops}
Nejlepší kolo: ${body.bestLap}
Safety Car: ${body.safetyCar}
Změna počasí: ${body.weatherChange}

Dodatečné poznámky k závodu:
${body.shrnutí}

Na základě těchto údajů vytvoř kompletní reportáž.
Neopakuj data pouze formou seznamu.
Zakomponuj je přirozeně do příběhu závodu.
`,
                    },
                ],
            });

        let result;

        try {
            result = JSON.parse(
                completion.choices[0].message.content || "{}"
            );
        } catch {
            return Response.json(
                {
                    error: "AI returned invalid JSON",
                },
                {
                    status: 500,
                }
            );
        }

        return Response.json(result);

    } catch (error) {
        console.error("GENERATE REPORT ERROR:", error);

        return Response.json(
            {
                error: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}