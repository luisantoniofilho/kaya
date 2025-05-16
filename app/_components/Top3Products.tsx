import ProductList from "./ProductList";

// Revalidate once per day
export const revalidate = 60 * 60 * 24;

export default async function Top3Products() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <ProductList limit={3} />
    </div>
  );
}
