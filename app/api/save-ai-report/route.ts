import { createClient } from "@supabase/supabase-js";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
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

    if (!body.title) {
      return Response.json(
        {
          success: false,
          error: "Missing title",
        },
        {
          status: 400,
        }
      );
    }

    const slug = createSlug(body.title);

    const { data, error } = await supabase
      .from("articles")
      .insert({
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.article,

        featured_image: body.featuredImage,

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

        music_title: body.musicTitle,
        music_url: body.musicUrl,
        music_file: body.musicFile,

        status: "published",
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    if (body.resultId) {
      await supabase
        .from("results")
        .update({
          article_slug: slug,
        })
        .eq("id", body.resultId);
    }

    return Response.json({
      success: true,
      article: data,
    });

  } catch (error) {
    console.error("SAVE ARTICLE ERROR:", error);

    return Response.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}