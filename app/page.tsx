import Product from "./products/Product";

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Product example */}
          <Product
            title="Máquina Industrial"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum earum illo modi esse provident culpa, repudiandae, eaque veritatis deleniti magni qui dolores nulla corrupti officiis, ipsa sed fugit facilis dolor."
            image={{
              src: "/maquina-industrial.webp",
              width: 600,
              height: 450,
            }}
            price={2400.0}
          />

          <Product
            title="Notebook Dell"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum earum illo modi esse provident culpa, repudiandae, eaque veritatis deleniti magni qui dolores nulla corrupti officiis, ipsa sed fugit facilis dolor."
            image={{
              src: "/notebook-dell.png",
              width: 1000,
              height: 1000,
            }}
            price={1200.0}
          />

          <Product
            title="Mesa de Escritório"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum earum illo modi esse provident culpa, repudiandae, eaque veritatis deleniti magni qui dolores nulla corrupti officiis, ipsa sed fugit facilis dolor."
            image={{
              src: "/mesa-de-escritorio.jpg",
              width: 1200,
              height: 800,
            }}
            price={250}
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
