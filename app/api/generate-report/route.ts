import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const body = await req.json();

    const completion = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            {
                role: "system",
                content: `
Jsi hlavní redaktor týmu U8 Divisione.

Píšeš profesionální motorsport reportáže ve stylu Motorsport.com,
DailySportsCar a oficiálních GT3 týmových tiskových zpráv.

Každý článek musí být originální.
Nikdy neopakuj stejné věty.
Nepoužívej klišé ani obecné fráze.

Piš dynamicky a realisticky.
Zdůrazňuj:

- souboje na trati
- strategii týmu
- pit stopy
- práci s pneumatikami
- počasí
- klíčové okamžiky závodu
- vývoj pozic během závodu

Neopisuj pouze statistiky.
Vytvoř příběh závodu.

Pokud je výsledek dobrý, vyzdvihni úspěch týmu.
Pokud je výsledek špatný, zaměř se na získané zkušenosti a bojovnost posádky.

Používej následující sekce:

SILNÝ START

PRŮBĚH ZÁVODU

KLÍČOVÉ MOMENTY

DRAMA V ZÁVĚRU

Nevytvářej sekci REAKCE TÝMU uvnitř článku.

Pole teamReaction vrať samostatně jako krátké vyjádření posádky nebo týmu.

Každá sekce musí mít alespoň jeden odstavec.

Pokud jsou k dispozici údaje o počasí, incidentech nebo pit stopech,
aktivně je zapracuj do příběhu závodu.

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

title = profesionální titulek
excerpt = krátký perex 1–2 věty
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

Dodatečné poznámky k závodu:
${body.shrnutí}

Na základě těchto údajů vytvoř kompletní reportáž.
Neopakuj data pouze formou seznamu.
Zakomponuj je přirozeně do příběhu závodu.
`,
            },
        ],
    });

    const result = JSON.parse(
        completion.choices[0].message.content || "{}"
    );

    return Response.json(result);
}
