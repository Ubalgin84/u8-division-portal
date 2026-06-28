type Props = {
  article: any;
};

export default function RaceSummary({ article }: Props) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-4">

      <div className="rounded-xl border border-red-900 bg-black/50 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          Start
        </p>

        <p className="mt-3 text-5xl font-black">
          P{article.start_pos}
        </p>
      </div>

      <div className="rounded-xl border border-red-900 bg-black/50 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          Cíl
        </p>

        <p className="mt-3 text-5xl font-black text-red-500">
          P{article.finish_pos}
        </p>
      </div>

      <div className="rounded-xl border border-red-900 bg-black/50 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          Body
        </p>

        <p className="mt-3 text-5xl font-black">
          {article.points}
        </p>
      </div>

      <div className="rounded-xl border border-red-900 bg-black/50 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          Trať
        </p>

        <p className="mt-3 text-xl font-bold">
          {article.track}
        </p>
      </div>

    </div>
  );
}