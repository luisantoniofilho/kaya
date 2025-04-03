"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/20/solid";
import HeaderLink from "./HeaderLink";

// Navigation links
const links = [
  { href: "/products", label: "Produtos disponíveis" },
  { href: "/advertise", label: "Anunciar produto" },
  { href: "/about", label: "Sobre nós" },
  { href: "/account", label: "Minha conta" },
  { href: "/faq", label: "Perguntas frequentes" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <header className="flex items-center justify-between border-b border-cyan-200 bg-cyan-50 px-6 py-4">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-black text-stone-600 transition-all duration-300 hover:text-cyan-500"
      >
        Kaya
      </Link>

      {/* Bigger screens link */}
      <nav className="hidden items-center gap-4 sm:flex sm:gap-6">
        {links.map(({ href, label }) => (
          <HeaderLink
            key={href}
            href={href}
            onClick={menuOpen ? handleCloseMenu : undefined}
          >
            {label}
          </HeaderLink>
        ))}
      </nav>

      {/* Mobile menu */}
      <button
        className="ml-auto cursor-pointer p-2 text-gray-700 sm:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <Bars4Icon className="size-6 text-stone-600" />
      </button>

      {/* Menu overlay */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={handleCloseMenu}
      ></div>

      {/* Menu lateral móvel */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={handleCloseMenu}>
          <XMarkIcon className="size-6" />
        </button>
        <ul className="mt-4 flex flex-col gap-4">
          {/* Link for home page only on the mobile screens */}
          <li>
            <HeaderLink href="/" onClick={handleCloseMenu}>
              Início
            </HeaderLink>
          </li>

          {/* Map over the links */}
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
