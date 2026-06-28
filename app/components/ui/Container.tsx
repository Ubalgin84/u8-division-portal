import { ReactNode } from "react";

type ContainerSize = "full" | "wide" | "content";

type Props = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

const sizes = {
  full: "max-w-[1600px]",
  wide: "max-w-[1280px]",
  content: "max-w-[900px]",
};

export default function Container({
  children,
  className = "",
  size = "full",
}: Props) {
  return (
    <div
      className={`mx-auto w-full ${sizes[size]} px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}