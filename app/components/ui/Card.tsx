import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-red-900
        bg-black/80
        backdrop-blur-sm
        p-5
        ${className}
      `}
    >
      {children}
    </div>
  );
}