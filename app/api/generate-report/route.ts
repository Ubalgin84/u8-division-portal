import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.replace("Bearer ", "");

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

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

        // Pouze administrátor může generovat reporty
        if (
            process.env.ADMIN_EMAIL &&
            user.email !== process.env.ADMIN_EMAIL
        ) {
            return Response.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        const body = await req.json();

        if (!body.nazev || !body.trat || !body.vuz) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Ochrana proti extrémně dlouhým vstupům
        if (
            body.shrnutí &&
            typeof body.shrnutí === "string" &&
            body.shrnutí.length > 5000
        ) {
            return Response.json(
                { error: "Summary too long" },
                { status: 400 }
            );
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

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

Článek rozděl pouze do přirozených odstavců.

Piš jako skutečný motorsport novinář.

Nevytvářej sekci REAKCE TÝMU uvnitř článku.

Pole teamReaction vrať samostatně.

Nepiš markdown.
Nepoužívej znaky ### ani **.
Nepoužívej odrážkové seznamy.

Vrať odpověď výhradně jako validní JSON:

{
  "title": "...",
  "excerpt": "...",
  "article": "...",
  "teamReaction": "..."
}
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

Dodatečné poznámky:
${body.shrnutí}
`,
                    },
                ],
            });

        const content =
            completion.choices?.[0]?.message?.content;

        if (!content) {
            return Response.json(
                { error: "Empty AI response" },
                { status: 500 }
            );
        }

        let result;

        try {
            result = JSON.parse(content);
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
        console.error(
            "GENERATE REPORT ERROR:",
            error
        );

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