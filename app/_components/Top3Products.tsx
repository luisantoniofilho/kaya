import { getProductsAction } from "../_lib/actions";
import Product from "./Product";

export default async function Top3Products() {
  const products = await getProductsAction();

  // Check if there is an error
  if (!Array.isArray(products)) {
    console.error(products.error.formErrors);
    return;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {products.slice(0, 3).map((product, index) => (
        <Product
          key={index}
          id={product.id}
          description={product.description}
          category={product.category}
          price={product.price}
          title={product.title}
          imagePath={product.imagePath}
        />
      ))}
    </div>
  );
}
