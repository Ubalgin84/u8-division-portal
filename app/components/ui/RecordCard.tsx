type RecordCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  details: string;
};

export default function RecordCard({
  title,
  value,
  subtitle,
  details,
}: RecordCardProps) {
  return (
    <div className="rounded-2xl border border-red-900 bg-black/70 backdrop-blur-sm p-6 transition-all duration-300 hover:border-red-600">

      <p className="text-sm uppercase tracking-[0.18em] text-red-500">
        {title}
      </p>

      <p className="mt-5 text-5xl font-black text-white">
        {value}
      </p>

      <p className="mt-5 text-xl font-semibold text-red-400">
        {subtitle}
      </p>

      <p className="mt-2 text-sm text-gray-400">
        {details}
      </p>

    </div>
  );
}