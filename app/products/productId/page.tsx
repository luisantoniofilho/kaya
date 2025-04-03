import Image from "next/image";

const product1 = {
  title: "Notebook Dell",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum earum illo modi esse provident culpa, repudiandae, eaque veritatis deleniti magni qui dolores nulla corrupti officiis, ipsa sed fugit facilis dolor.",
  category: "Componentes eletrônicos",
  contact: 99999999,
  image: {
    src: "/notebook-dell.png",
    width: 1000,
    height: 1000,
  },
  price: 1200.0,
};

export default function Page({ product = product1 }) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Product image */}
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <Image
            src={product.image.src}
            alt={product.title}
            height={product.image.height}
            width={product.image.width}
            className="w-full rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Product informations */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <h3 className="text-base font-bold text-gray-800">
            {product.category}
          </h3>
          <p className="mt-4 text-2xl font-semibold text-blue-600">
            R$ {product.price.toFixed(2)}
          </p>
          <p className="mt-2 text-gray-700">{product.description}</p>

          <h2 className="mt-2 text-xl text-gray-700">
            Contacte o vendedor: {product.contact}
          </h2>

          {/* Buy button */}
          <button className="mt-6 w-full cursor-pointer rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700">
            Comprar Agora
          </button>
        </div>
      </div>
    </main>
  );
}
