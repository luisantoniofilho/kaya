import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import ProductList from "../_components/ProductList";

export const revalidate = 60;

export default async function Page() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Page title */}
      <h1 className="mb-6 text-4xl font-bold text-gray-800">Produtos</h1>

      {/* Search bar */}
      <div className="relative mb-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
        <MagnifyingGlassIcon className="absolute top-2.5 right-3 h-5 w-5 cursor-pointer text-gray-400" />
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductList />
      </div>
    </main>
  );
}
