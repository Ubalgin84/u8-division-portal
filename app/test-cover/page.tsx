import U8RaceCover from "../components/U8RaceCover";

export default function TestCoverPage() {
  return (
    <main className="min-h-screen bg-black p-10">

      <U8RaceCover
        raceName="Road America 6H"
        track="Road America"
        car="Ferrari 296 GT3"
        startPos={12}
        finishPos={3}
        points={35}
        crew="Ubalgin_8, Driver2, Driver3"
        raceDate="7. června 2026"
      />

    </main>
  );
}