import ProductList from "../_components/product/ProductList";
import SearchBar from "../_components/ui/SearchBar";

export const metadata = {
  title: "Produtos",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[] | undefined }>;
}) {
  // Extract query from search params
  const { query } = await searchParams;
  // Handle query being an array or undefined
  const q = Array.isArray(query) ? query[0] : (query ?? "");

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Page heading */}
      <h1 id="products-title" className="mb-6 text-4xl font-bold text-gray-800">
        Produtos
      </h1>

      {/* Search input with default query */}
      <SearchBar defaultQuery={q} />

      {/* Product list */}
      <section aria-labelledby="products-title">
        <ProductList query={q} />
      </section>
    </main>
  );
}
