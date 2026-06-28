type Props = {
  label: string;
  value: React.ReactNode;
};

export default function RaceDataCard({ label, value }: Props) {
  return (
    <div>
      <p className="text-gray-500 uppercase text-sm">
        {label}
      </p>

      <p className="text-xl font-bold">
        {value}
      </p>
    </div>
  );
}