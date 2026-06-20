import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import LogoutButton from "./components/LogoutButton";
import HeroControlCenter from "./components/HeroControlCenter";
import StatsGrid from "./components/StatsGrid";
import DriverCenter from "./components/DriverCenter";
import QuickActions from "./components/QuickActions";
import MusicCenter from "./components/MusicCenter";
import UpcomingRaceCard from "./components/UpcomingRaceCard";
import FeaturedReport from "./components/FeaturedReport";


export default async function AdminDashboard() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("id", { ascending: false })
    .limit(5);

  const { data: results } = await supabase
    .from("results")
    .select("*");

  const latestArticle = articles?.[0];
  const totalRaces = results?.length || 0;

  const totalPoints =
    results?.reduce(
      (sum, race) => sum + (race.points || 0),
      0
    ) || 0;

  const bestFinish =
    results?.length
      ? Math.min(
        ...results.map(
          (race) => race.finish_pos || 999
        )
      )
      : "-";

  const latestRace =
    results?.length
      ? results[results.length - 1]
      : null;

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="min-h-screen bg-black/90 text-white flex">

        {/* SIDEBAR */}

        <aside className="w-80 border-r border-red-900 bg-black/80 backdrop-blur-md">

          <div className="p-8 border-b border-red-900">



            <div className="text-center">
              <h2 className="text-5xl font-black text-red-500">U8</h2>

              <p className="text-gray-400 uppercase tracking-[0.3em] text-xs">
                Divisione
              </p>

              <p className="text-red-500 uppercase tracking-[0.3em] text-xs mt-6">
                Control Center
              </p>
            </div>

          </div>

          <nav className="p-6 space-y-4">

            <Link
              href="/admin"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/clanky"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              📚 Správa článků
            </Link>

            <Link
              href="/admin/novy-clanek"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              📰 Nový článek
            </Link>

            <Link
              href="/admin/kalendar"
              className="block border border-blue-900 rounded-xl p-4 hover:border-blue-500 transition"
            >
              📅 Race Calendar
            </Link>

            <Link
              href="/admin/ai-report"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              🤖 AI Report
            </Link>
            <Link
              href="/admin/vysledky"
              className="block border border-red-900 rounded-xl p-4 hover:border-red-500 hover:bg-red-950/20 transition"
            >
              🏁 Výsledky
            </Link>
          
          </nav>

        </aside>

        {/* CONTENT */}

        <div className="flex-1">

          <div className="border-b border-red-900 px-10 py-8 flex justify-between items-center">

            <div>

              <p className="text-red-500 uppercase tracking-[0.4em] text-sm">
                U8 Divisione
              </p>

              <h1 className="text-6xl font-black">
                CONTROL CENTER
              </h1>

            </div>
            <div className="flex gap-3">

              <a
                href="/"
                target="_blank"
                className="border border-red-600 px-6 py-3 rounded-xl hover:bg-red-600 transition"
              >
                Otevřít web
              </a>

              <LogoutButton />

            </div>


          </div>

          <div className="p-10">

            <HeroControlCenter
              latestRace={latestRace}
              latestArticle={latestArticle}
            />

            <StatsGrid
              articleCount={count ?? 0}
              totalRaces={totalRaces}
              totalPoints={totalPoints}
              bestFinish={bestFinish}
            />

            <div className="grid xl:grid-cols-3 gap-6 mb-10">

              <DriverCenter />

              <MusicCenter />

              <UpcomingRaceCard />

            </div>
            <div className="grid xl:grid-cols-2 gap-6 mb-10">

              <FeaturedReport
                article={latestArticle}
              />

              <QuickActions />

            </div>

          </div>

        </div>
      </div>
    </main >
  );
}