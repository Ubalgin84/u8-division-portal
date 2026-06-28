type StatCardProps = {
  value: string | number;
  label: string;
};

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-red-900 bg-black/70 backdrop-blur-sm p-8 text-center">

      <p className="text-5xl font-black text-red-500">
        {value}
      </p>

      <p className="mt-3 text-gray-400 uppercase text-sm tracking-wide">
        {label}
      </p>

    </div>
  );
}