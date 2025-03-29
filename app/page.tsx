import Product from "./_components/Product";

function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      {/* Title and introduction */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Kaya</h1>
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Product example */}

          <Product
            imgSrc="https://via.placeholder.com/150"
            price={2400.0}
            title="Máquina Industrial"
          />

          <Product
            imgSrc="https://via.placeholder.com/150"
            price={1200.0}
            title="Notebook Dell"
          />

          <Product
            imgSrc="https://via.placeholder.com/150"
            price={250}
            title="Mesa de Escritório"
          />
        </div>
      </section>

      <section>
        <h2>Who we are?</h2>
      </section>
    </main>
  );
}

export default Page;
