import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import ProductList from "../_components/ProductList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[] | undefined }>;
}) {
  const { query } = await searchParams;
  const q = Array.isArray(query) ? query[0] : (query ?? "");

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">Produtos</h1>
      <SearchBar defaultQuery={q} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductList />
      </div>
    </main>
  );
}
