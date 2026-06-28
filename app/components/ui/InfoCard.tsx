import { ReactNode } from "react";

type InfoCardProps = {
  children: ReactNode;
  className?: string;
};

export default function InfoCard({
  children,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`rounded-2xl border border-red-900 bg-black/70 backdrop-blur-sm p-8 ${className}`}
    >
      {children}
    </div>
  );
}