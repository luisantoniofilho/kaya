import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Product from "./Product";

export default function Page() {
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
    </main>
  );
}
