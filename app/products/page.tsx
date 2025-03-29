import Product from "../_components/Product";

// Test data
const products = [
  {
    imgSrc: "/images/product1.jpg",
    title: "Mesa de Escritório",
    price: 250,
  },
  {
    imgSrc: "/images/product2.jpg",
    title: "Cadeira Ergonômica",
    price: 400,
  },
  {
    imgSrc: "/images/product3.jpg",
    title: "Monitor 24''",
    price: 700,
  },
  {
    imgSrc: "/images/product4.jpg",
    title: "Máquina Industrial",
    price: 5000,
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">Produtos</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Product
            key={index}
            imgSrc={product.imgSrc}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </main>
  );
}
