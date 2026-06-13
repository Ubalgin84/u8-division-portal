import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function POST(req: Request) {
  const body = await req.json();

  const slug = createSlug(body.title);

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.article,
      track: body.track,
      car: body.car,
      start_pos: body.start,
      finish_pos: body.finish,
      points: body.points,
      incidents: Number(body.incidents || 0),

      weather: body.weather,
      race_length: body.raceLength,
      race_date: body.raceDate,

      pit_stops: body.pitStops,
      fastest_lap: body.bestLap,
      safety_car: body.safetyCar,
      weather_change: body.weatherChange,

      crew: body.crew,
      team_reaction: body.teamReaction,

      status: "published",
    })
    .select()
    .single();
  if (body.resultId) {
    await supabase
      .from("results")
      .update({
        article_slug: slug,
      })
      .eq("id", body.resultId);
  }

  if (error) {
    console.error("SUPABASE ERROR:", error);

    return Response.json({
      success: false,
      slug,
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }

  return Response.json({
    success: true,
    article: data,
  });
}