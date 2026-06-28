import { createClient } from "./supabase-server";

export async function getRace(articleSlug: string) {
  const supabase = await createClient();

  const [
    articleResponse,
    resultResponse,
    songResponse,
    calendarResponse,
  ] = await Promise.all([
    supabase
      .from("articles")
      .select("*")
      .eq("slug", articleSlug)
      .single(),

    supabase
      .from("results")
      .select("*")
      .eq("article_slug", articleSlug)
      .single(),

    supabase
      .from("songs")
      .select("*")
      .eq("article_slug", articleSlug)
      .single(),

    supabase
      .from("race_calendar")
      .select("*")
      .eq("article_slug", articleSlug)
      .single(),
  ]);

  return {
    article: articleResponse.data,
    result: resultResponse.data,
    song: songResponse.data,
    calendar: calendarResponse.data,
  };
}