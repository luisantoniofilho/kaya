import Link from "next/link";
import { ReactNode } from "react";

type DesktopLinkProps = {
  href: string;
  children: ReactNode;
};

export function DesktopLink({ href, children }: DesktopLinkProps) {
  return (
    <Link
      href={href}
      className="hover:bg-primary-900 rounded-full px-4 py-2 text-xl text-stone-600 transition-all duration-300 hover:bg-stone-600 hover:text-cyan-200 lg:text-lg"
      data-test={`link-${href.replace("/", "")}-desktop`}
    >
      {children}
    </Link>
  );
}
