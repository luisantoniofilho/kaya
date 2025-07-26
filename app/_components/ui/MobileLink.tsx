import Link from "next/link";

type MobileLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function MobileLink({ href, children, onClick }: MobileLinkProps) {
  const linkClass =
    "hover:bg-primary-900 rounded-full px-4 py-2 text-xl text-stone-600 transition-all duration-300 hover:bg-stone-600 hover:text-cyan-200 lg:text-lg";

  return (
    <Link
      href={href}
      className={linkClass}
      onClick={onClick}
      data-test={`link-${href.replace("/", "")}-mobile`}
    >
      {children}
    </Link>
  );
}
