type StatCardProps = {
  value: string | number;
  label: string;
};

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-red-900 bg-black/70 backdrop-blur-sm p-6 text-center">

      <p className="text-4xl font-black text-red-500">
        {value}
      </p>

      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-400">
        {label}
      </p>

    </div>
  );
}