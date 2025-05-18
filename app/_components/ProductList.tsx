import { getProductsAction } from "../_lib/actions";
import { ProductType } from "../schemas/productSchema";
import ProductCard from "./ProductCard";

export default async function ProductList({ limit }: { limit?: number }) {
  const products = await getProductsAction();

  if (!Array.isArray(products)) return <p>Erro ao carregar produtos.</p>;

  const slice = limit ?? products.length;

  return (
    <>
      {products.slice(0, slice).map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
