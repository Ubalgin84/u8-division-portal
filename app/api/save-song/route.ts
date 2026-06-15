import { createClient } from "@supabase/supabase-js";

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

    const { data, error } = await supabase
      .from("songs")
      .insert({
        title: body.title,
        cover_image: body.coverImage,
        music_file: body.musicFile,
        youtube_url: body.youtubeUrl,
      })
      .select()
      .single();

    if (error) {
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

    return Response.json({
      success: true,
      song: data,
    });

  } catch (error) {
    console.error(error);

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