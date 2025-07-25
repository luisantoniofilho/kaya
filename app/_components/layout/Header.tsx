import Link from "next/link";
import DesktopMenu from "./DesktopMenu";
import { LoginIcon } from "../auth/LoginIcon";
import MobileMenu from "./MobileMenu";

export function Header() {
  const links = [
    { href: "/products", label: "Produtos" },
    { href: "/list", label: "Anunciar" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "Sobre nós" },
  ];

  return (
    <header className="flex items-center justify-between bg-cyan-50 px-6 py-4 md:gap-4">
      {/* Logo */}
      <Link
        href="/"
        className="text-primary-900 text-2xl transition-all duration-300 hover:text-cyan-500 lg:text-3xl"
        data-test="link-home"
      >
        Kaya
      </Link>

      <DesktopMenu links={links} />
      <MobileMenu links={links}>
        <LoginIcon />
      </MobileMenu>
    </header>
  );
}

export default Header;
