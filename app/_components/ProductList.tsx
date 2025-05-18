import { getProductsAction } from "../_lib/actions";
import { ProductType } from "../schemas/productSchema";
import ProductCard from "./ProductCard";

export default async function ProductList({ limit }: { limit?: number }) {
  const products = await getProductsAction();

  if (!Array.isArray(products)) {
    console.error(products?.error || "Erro desconhecido ao buscar produtos.");
    return (
      <div className="py-10 text-center">
        <p className="text-lg font-medium text-red-600">
          Erro ao carregar produtos.
        </p>
      </div>
    );
  }

  const slice = limit ?? products.length;
  const displayedProducts = products.slice(0, slice);

  if (displayedProducts.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-gray-600">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {displayedProducts.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
