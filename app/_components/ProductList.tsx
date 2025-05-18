import { getProductsAction } from "../_lib/actions";
import { ProductType } from "../schemas/productSchema";
import ProductCard from "./ProductCard";

export default async function ProductList({ limit }: { limit?: number }) {
  const { data: products, error } = await getProductsAction();
  console.log(products);

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
    <>
      {products.slice(0, slice).map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
