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
      !authHeader.startsWith("Bearer ")
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

    // Pouze administrátor může spravovat hudbu
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

    if (
      typeof body.title !== "string" ||
      body.title.length < 1 ||
      body.title.length > 200
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid title",
        },
        {
          status: 400,
        }
      );
    }

    if (
      body.youtubeUrl &&
      typeof body.youtubeUrl === "string" &&
      body.youtubeUrl.length > 500
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid YouTube URL",
        },
        {
          status: 400,
        }
      );
    }

    let result;

    if (body.id) {
      result = await supabase
        .from("songs")
        .update({
          title: body.title,
          cover_image: body.coverImage,
          music_file: body.musicFile,
          youtube_url: body.youtubeUrl,
        })
        .eq("id", body.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from("songs")
        .insert({
          title: body.title,
          cover_image: body.coverImage,
          music_file: body.musicFile,
          youtube_url: body.youtubeUrl,
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error("SAVE SONG ERROR:", result.error);

      return Response.json(
        {
          success: false,
          error: "Failed to save song",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
      song: result.data,
    });

  } catch (error) {
    console.error("SAVE SONG ROUTE ERROR:", error);

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