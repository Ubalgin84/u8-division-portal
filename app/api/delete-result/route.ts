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
      return Response.json(
        { error: "Missing result id" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("results")
      .delete()
      .eq("id", id);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}