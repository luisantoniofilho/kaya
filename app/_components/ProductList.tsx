import { getProductsAction } from "../_lib/actions";
import Product from "./Product";

export default async function ProductList({ limit }: { limit?: number }) {
  const products = await getProductsAction();

  if (!Array.isArray(products)) return <p>Erro ao carregar produtos.</p>;

  const slice = limit ?? products.length;

  return (
    <>
      {products.slice(0, slice).map((product) => (
        <Product
          key={product.id}
          id={product.id}
          description={product.description}
          category={product.category}
          price={product.price}
          title={product.title}
          imageUrl={product.imageUrl}
        />
      ))}
    </>
  );
}
