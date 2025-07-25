import ProductList from "./_components/product/ProductList";

export const metadata = {
  title: "Página Inicial",
};

function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      {/* Title and introduction */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl text-stone-800">Kaya</h1>
        <p className="mt-4 text-lg text-gray-600">
          Conectamos pessoas e empresas para dar uma nova vida a produtos que
          ainda têm valor. Venda ou doe itens usados de forma prática e
          sustentável.
        </p>
      </section>

      {/* Products list */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          Produtos em Destaque
        </h2>
        <ProductList limit={3} />
      </section>
    </main>
  );
}

export default Page;
