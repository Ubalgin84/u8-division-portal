type BadgeProps = {
  children: React.ReactNode;
  color?: "red" | "green" | "gray";
};

export default function Badge({
  children,
  color = "red",
}: BadgeProps) {
  const colors = {
    red: "border-red-500/40 bg-red-500/10 text-red-400",
    green: "border-green-500/40 bg-green-500/10 text-green-400",
    gray: "border-gray-600 bg-gray-700/20 text-gray-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] ${colors[color]}`}
    >
      {children}
    </span>
  );
}