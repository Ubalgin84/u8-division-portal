import { ReactNode } from "react";

type TableCardProps = {
  children: ReactNode;
};

export default function TableCard({
  children,
}: TableCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-red-900 bg-black/70 backdrop-blur-sm">
      {children}
    </div>
  );
}