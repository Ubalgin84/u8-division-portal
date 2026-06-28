import { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  subtitle?: string;
  centered?: boolean;
};

export default function SectionTitle({
  children,
  subtitle,
  centered = false,
}: SectionTitleProps) {
  return (
    <div className={centered ? "text-center mb-12" : "mb-12"}>

      {subtitle && (
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-red-500">
          {subtitle}
        </p>
      )}

      <h2 className="text-5xl font-black">
        {children}
      </h2>

    </div>
  );
}