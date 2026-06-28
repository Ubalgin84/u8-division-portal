import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SectionTitle from "./SectionTitle";

type StatsSectionProps = {
  title: string;
  icon?: string | LucideIcon;
  children: ReactNode;
};

export default function StatsSection({
  title,
  icon,
  children,
}: StatsSectionProps) {
  return (
    <section className="mb-14">

      {typeof icon === "function" ? (
        <SectionHeading icon={icon}>
          {title}
        </SectionHeading>
      ) : (
        <SectionTitle centered>
          {icon} {title}
        </SectionTitle>
      )}

      <div className="mb-8 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {children}

    </section>
  );
}