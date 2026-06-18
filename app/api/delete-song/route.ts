import { NextResponse } from "next/server";
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

    // Pouze administrátor může mazat skladby
    if (
      process.env.ADMIN_EMAIL &&
      user.email !== process.env.ADMIN_EMAIL
    ) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing song id",
        },
        {
          status: 400,
        }
      );
    }

    await supabase
      .from("articles")
      .update({
        song_id: null,
      })
      .eq("song_id", id);

    const { error } = await supabase
      .from("songs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "DELETE SONG ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete song",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(
      "DELETE SONG ROUTE ERROR:",
      error
    );

    return NextResponse.json(
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