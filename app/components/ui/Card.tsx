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
        rounded-xl
        border
        border-red-900/70
        bg-black/75
        backdrop-blur-md
        shadow-lg
        transition-all duration-300
        ${padded ? "p-4 md:p-5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}