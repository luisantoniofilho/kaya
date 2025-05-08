import { getProducts } from "../_lib/mongodb/mongodbActions";
import Product from "./Product";

export default async function Top3Products() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {products.slice(0, 3).map((product, index) => (
        <Product
          key={index}
          description={product.description}
          category={product.category}
          price={product.price}
          title={product.title}
        />
      ))}
    </div>
  );
}
