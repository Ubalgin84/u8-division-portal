type StatCardProps = {
  value: string | number;
  label: string;
  small?: boolean;
};

export default function StatCard({
  value,
  label,
  small = false,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-red-900 bg-black/70 backdrop-blur-sm py-5 px-4 text-center">

      <p
        className={
          small
            ? "text-3xl font-black text-red-500 break-words leading-tight"
            : "text-5xl font-black text-red-500"
        }
      >
        {value}
      </p>

      <p className="mt-3 text-gray-400 uppercase text-xs tracking-[0.18em]">
        {label}
      </p>

    </div>
  );
}