import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { getProducts } from "../_lib/firebaseActions";
import Product from "../_components/Product";

export default async function Page() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Título da Página */}
      <h1 className="mb-6 text-4xl font-bold text-gray-800">Produtos</h1>

      {/* Barra de Pesquisa */}
      <div className="relative mb-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
        <MagnifyingGlassIcon className="absolute top-2.5 right-3 h-5 w-5 cursor-pointer text-gray-400" />
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Product
            key={index}
            description={product.description}
            category={product.category}
            price={product.price}
            title={product.title}
          />
        ))}
      </div>
    </main>
  );
}
