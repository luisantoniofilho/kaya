import { DesktopLink } from "./DesktopLink";
import { LoginIcon } from "./LoginIcon";

export default function DesktopMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <nav className="hidden justify-between gap-4 text-center lg:flex">
      {links.map(({ href, label }) => (
        <DesktopLink key={href} href={href}>
          {label}
        </DesktopLink>
      ))}

      <LoginIcon />
    </nav>
  );
}
