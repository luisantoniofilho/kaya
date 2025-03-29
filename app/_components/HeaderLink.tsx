import Link from "next/link";
import { ReactNode } from "react";

type HeaderLinkProps = {
  href: string;
  children: ReactNode;
  classNameOptional?: string;
  onClick?: () => void;
};

export default function HeaderLink({
  href,
  children,
  classNameOptional,
  onClick,
}: HeaderLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-base text-stone-600 transition-all duration-300 hover:bg-stone-600 hover:text-cyan-200 ${classNameOptional}`}
    >
      {children}
    </Link>
  );
}
