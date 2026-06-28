type Result = {
  finish_pos: number;
  points: number;
  car: string;
  track: string;
  incidents: number;
};

export function getTeamStats(results: Result[]) {
  const totalRaces = results.length;

  const wins = results.filter(
    (race) => race.finish_pos === 1
  ).length;

  const podiums = results.filter(
    (race) => race.finish_pos <= 3
  ).length;

  const top5 = results.filter(
    (race) => race.finish_pos <= 5
  ).length;

  const top10 = results.filter(
    (race) => race.finish_pos <= 10
  ).length;

  const totalPoints = results.reduce(
    (sum, race) => sum + (race.points || 0),
    0
  );

  const averagePoints =
    totalRaces > 0
      ? (totalPoints / totalRaces).toFixed(1)
      : "0";

  const averageFinish =
    totalRaces > 0
      ? (
          results.reduce(
            (sum, race) => sum + race.finish_pos,
            0
          ) / totalRaces
        ).toFixed(1)
      : "-";

  const bestFinish =
    totalRaces > 0
      ? Math.min(...results.map((r) => r.finish_pos))
      : "-";

  const worstFinish =
    totalRaces > 0
      ? Math.max(...results.map((r) => r.finish_pos))
      : "-";

  const totalIncidents = results.reduce(
    (sum, race) => sum + (race.incidents || 0),
    0
  );

  const averageIncidents =
    totalRaces > 0
      ? (totalIncidents / totalRaces).toFixed(1)
      : "0";

  const favoriteCar =
    Object.entries(
      results.reduce((acc, race) => {
        acc[race.car] = (acc[race.car] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const favoriteTrack =
    Object.entries(
      results.reduce((acc, race) => {
        acc[race.track] = (acc[race.track] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return {
    totalRaces,
    wins,
    podiums,
    top5,
    top10,
    totalPoints,
    averagePoints,
    averageFinish,
    bestFinish,
    worstFinish,
    totalIncidents,
    averageIncidents,
    favoriteCar,
    favoriteTrack,
  };
}