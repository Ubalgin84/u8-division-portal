import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

export default function Card({
  children,
  className = "",
  padded = true,
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-red-900
        bg-black/80
        backdrop-blur-sm
        ${padded ? "p-5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}