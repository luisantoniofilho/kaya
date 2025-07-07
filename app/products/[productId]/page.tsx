import { getProductAction } from "@/app/_lib/actions";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;
  // Fetch product data by ID
  const { data: product, error } = await getProductAction(productId);

  // Handle errors or missing image
  if (error || !product?.imageUrl) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-20">
        <div role="alert" className="text-center text-xl text-red-600">
          Ocorreu um erro ao carregar o produto.
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-12 md:px-12">
      {/* Product title */}
      <section
        className="mb-10 w-full max-w-7xl px-2 text-left"
        aria-labelledby="product-title"
      >
        <h1
          id="product-title"
          className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
        >
          {product.title}
        </h1>
      </section>

      {/* Image and product details */}
      <section className="grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product image */}
        <article className="flex justify-center">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={800}
            height={800}
            className="w-full max-w-lg rounded-xl object-cover shadow-lg"
            priority
          />
        </article>

        {/* Product info */}
        <div className="flex flex-col justify-start gap-6 text-gray-800">
          <article>
            <span className="text-sm font-medium text-gray-500">Categoria</span>
            <p className="text-lg font-semibold text-gray-700">
              {product.category}
            </p>
          </article>

          <article>
            <span className="text-sm font-medium text-gray-500">Preço</span>
            <p className="text-3xl font-bold text-blue-600">
              R$ {product.price}
            </p>
          </article>

          <article>
            <span className="text-sm font-medium text-gray-500">Descrição</span>
            <p className="text-base leading-relaxed">{product.description}</p>
          </article>

          {/* Seller contact */}
          <div className="mt-4 pt-4">
            <p className="text-base font-medium">
              📞 Telefone do vendedor:{" "}
              <span className="font-semibold">{product.contactNumber}</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
