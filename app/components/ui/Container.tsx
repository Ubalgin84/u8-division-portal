import { ReactNode } from "react";

type ContainerSize = "full" | "wide" | "content";

type Props = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

const sizes = {
  full: "max-w-[1600px]",
  wide: "max-w-[1320px]",
  content: "max-w-[960px]",
};

export default function Container({
  children,
  className = "",
  size = "full",
}: Props) {
  return (
    <div
      className={`w-full ${sizes[size]} mx-auto px-5 md:px-7 xl:px-8 ${className}`}
    >
      {children}
    </div>
  );
}