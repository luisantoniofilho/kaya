import Link from "next/link";
import { ReactNode } from "react";

type HeaderLinkProps = {
  href: string;
  children: ReactNode;
};

export default function HeaderLink({ href, children }: HeaderLinkProps) {
  return (
    <Link
      key={href}
      href={href}
      className="hover:bg-primary-900 rounded-full px-4 py-2 text-base text-stone-600 transition-all duration-300 hover:text-cyan-300"
    >
      {children}
    </Link>
  );
}
