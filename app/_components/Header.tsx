"use client";

import Link from "next/link";
import { useState } from "react";
import { HeaderLink } from "./HeaderLink";
import { LoginIcon } from "./LoginIcon";
import { MobileMenuButton } from "./MobileMenuButton";

export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleCloseMenu = () => setMenuIsOpen(false);

  const links = [
    { href: "/products", label: "Produtos" },
    { href: "/advertise", label: "Anunciar" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "Sobre nós" },
  ];

  return (
    <header className="flex items-center justify-between bg-cyan-50 px-6 py-4 md:gap-4">
      {/* Logo */}
      <Link
        href="/"
        className="text-primary-900 text-2xl transition-all duration-300 hover:text-cyan-500 lg:text-3xl"
      >
        Kaya
      </Link>

      {/* Desktop menu */}
      <nav className="hidden justify-between gap-4 text-center lg:flex">
        {links.map(({ href, label }) => (
          <HeaderLink key={href} href={href}>
            {label}
          </HeaderLink>
        ))}

        <LoginIcon onClick={setMenuIsOpen} />
      </nav>

      {/* Mobile menu button */}
      <MobileMenuButton menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          menuIsOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={handleCloseMenu}
      />

      {/* Mobile drawer */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-80 transform bg-green-50 p-6 shadow-lg transition-transform duration-300 ${
          menuIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-2 flex">
          <LoginIcon onClick={setMenuIsOpen} />
          <MobileMenuButton
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>

        <ul className="flex flex-col gap-4">
          {/* Home link */}
          <li>
            <HeaderLink href="/" onClick={handleCloseMenu}>
              Home page
            </HeaderLink>
          </li>

          {links.map(({ href, label }) => (
            <li key={href}>
              <HeaderLink href={href} onClick={handleCloseMenu}>
                {label}
              </HeaderLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
