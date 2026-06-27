export function getTrackImage(track?: string): string {
  if (!track) return "/hero-bg.png";

  const t = track.toLowerCase();

  if (t.includes("spa"))
    return "/tracks/spa.jpg";

  if (t.includes("monza"))
    return "/tracks/monza.jpg";

  if (t.includes("watkins"))
    return "/tracks/watkins-glen.jpg";

  if (t.includes("nürburgring") || t.includes("nurburgring"))
    return "/tracks/nurburgring.jpg";

  if (t.includes("mount panorama") || t.includes("bathurst"))
    return "/tracks/mount-panorama.jpg";

  if (t.includes("road atlanta"))
    return "/tracks/road-atlanta.jpg";

  if (t.includes("road america"))
    return "/tracks/road-america.jpg";

  if (t.includes("vir") || t.includes("virginia"))
    return "/tracks/vir.jpg";

  if (t.includes("adelaide"))
    return "/tracks/adelaide.jpg";

  if (t.includes("hockenheim"))
    return "/tracks/hockenheim.jpg";

  if (t.includes("le mans") || t.includes("24 heures"))
    return "/tracks/lemans.jpg";

  if (t.includes("indianapolis"))
    return "/tracks/indianapolis.jpg";

  if (t.includes("st. petersburg") || t.includes("st petersburg"))
    return "/tracks/st-petersburg.jpg";

  if (t.includes("red bull"))
    return "/tracks/red-bull-ring.jpg";

  if (t.includes("suzuka"))
    return "/tracks/suzuka.jpg";

  if (t.includes("josé") || t.includes("interlagos"))
    return "/tracks/interlagos.jpg";

  if (t.includes("fuji"))
    return "/tracks/fuji.jpg";

  if (t.includes("daytona"))
    return "/tracks/daytona.jpg";

  if (t.includes("motegi"))
    return "/tracks/motegi.jpg";

  return "/hero-bg.png";
}