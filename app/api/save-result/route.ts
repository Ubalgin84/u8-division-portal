import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
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

    const { data, error } = await supabase
      .from("results")
      .insert({
        race_name: body.race_name,
        track: body.track,
        car: body.car,
        crew: body.crew,
        start_pos: Number(body.start_pos),
        finish_pos: Number(body.finish_pos),
        points: Number(body.points),
        incidents: Number(body.incidents),
        race_length: body.race_length,
        weather: body.weather,
        race_date: body.race_date,
      })
      .select()
      .single();

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      result: data,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}