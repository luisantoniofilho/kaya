import { getProductsAction } from "../../_lib/actions";
import { ProductType } from "../../schemas/productSchema";
import ProductCard from "./ProductCard";

export default async function ProductList({
  query = "",
  limit,
}: {
  query?: string;
  limit?: number;
}) {
  const { data: products, error } = await getProductsAction();

  if (!Array.isArray(products)) {
    console.error(error || "Erro desconhecido ao buscar produtos.");
    return (
      <div className="py-10 text-center">
        <p className="text-lg font-medium text-red-600">
          Erro ao carregar produtos.
        </p>
      </div>
    );
  }

  const normalizedQuery = query.toLowerCase().trim();
  const filtered = products.filter((product: ProductType) =>
    product.title.toLowerCase().includes(normalizedQuery),
  );

  const displayedProducts = filtered.slice(0, limit ?? filtered.length);

  if (displayedProducts.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-gray-600">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {displayedProducts.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
