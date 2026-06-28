import { ReactNode } from "react";
import SectionTitle from "./SectionTitle";

type StatsSectionProps = {
  title: string;
  icon?: string;
  children: ReactNode;
};

export default function StatsSection({
  title,
  icon,
  children,
}: StatsSectionProps) {
  return (
    <section className="mb-14">

      <SectionTitle centered>
        {icon} {title}
      </SectionTitle>

      <div className="mb-8 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {children}

    </section>
  );
}