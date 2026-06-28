import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  icon: LucideIcon;
  children: ReactNode;
  centered?: boolean;
};

export default function SectionHeading({
  icon: Icon,
  children,
  centered = false,
}: Props) {
  return (
    <div className={centered ? "flex justify-center" : ""}>
      <h2 className="mb-8 flex items-center gap-4 text-3xl font-black">
        <Icon className="h-7 w-7 text-red-500" />
        <span>{children}</span>
      </h2>
    </div>
  );
}