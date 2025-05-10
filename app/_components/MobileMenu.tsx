"use client";

import { ReactNode, useState } from "react";
import { MobileLink } from "./MobileLink";
import { MobileMenuButton } from "./MobileMenuButton";

export default function MobileMenu({
  links,
  children,
}: {
  links: { href: string; label: string }[];
  children: ReactNode;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleCloseMenu = () => setMenuIsOpen(false);

  return (
    <>
      {/* Menu toggle button (visible on smaller screens only) */}
      <MobileMenuButton menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />

      {/* Dark overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          menuIsOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={handleCloseMenu}
      />

      {/* Mobile side menu */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-80 transform bg-green-50 p-6 shadow-lg transition-transform duration-300 ${
          menuIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header section with optional children and close button */}
        <div className="mb-2 flex items-center justify-between">
          <div className="px-3" onClick={handleCloseMenu}>
            {children}
          </div>
          <MobileMenuButton
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>

        {/* Navigation links */}
        <ul className="flex flex-col gap-4">
          {/* Static link to homepage */}
          <li>
            <MobileLink href="/" onClick={handleCloseMenu}>
              Home page
            </MobileLink>
          </li>

          {/* Dynamic links */}
          {links.map(({ href, label }) => (
            <li key={href}>
              <MobileLink href={href} onClick={handleCloseMenu}>
                {label}
              </MobileLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
