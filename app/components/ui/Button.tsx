import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  external = false,
  className = "",
}: ButtonProps) {
  const styles = `
    inline-flex
    items-center
    justify-center
    rounded-2xl
    border
    border-red-600
    px-6
    py-3
    text-sm
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-red-600
    ${className}
  `;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}