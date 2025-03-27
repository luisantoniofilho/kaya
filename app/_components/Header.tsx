import Link from "next/link";
import HeaderLink from "./HeaderLink";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-cyan-200 bg-cyan-100 px-6 py-4 sm:justify-center sm:gap-10">
      {/* Link to main page */}
      <Link href="/" className="text-2xl text-stone-600">
        Kaya
      </Link>

      {/* Links to other pages */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <HeaderLink href="inputPhysicalData">Produtos</HeaderLink>

        <HeaderLink href="macronutrients">Anúncios</HeaderLink>

        <HeaderLink href="mealsSuggestions">Meals</HeaderLink>
      </div>
    </header>
  );
}

export default Header;
