import { getProductAction, getProductsAction } from "@/app/_lib/actions";
import Image from "next/image";

export async function generateStaticParams() {
  const products = await getProductsAction();
  if (!Array.isArray(products)) return [];
  return products.map((product) => ({
    productId: product.id?.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { data: product, error } = await getProductAction(productId);

  if (error) {
    console.error(error);
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-20">
        <p className="text-center text-xl text-red-600">
          Ocorreu um erro ao carregar o produto.
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-20">
        <p className="text-center text-xl text-gray-500">
          Produto não encontrado.
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-12 md:px-12">
      {/* Title */}
      <div className="mb-10 w-full max-w-7xl px-2 text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {product.title}
        </h1>
      </div>

      {/* Image + Info */}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* Image */}
        <div className="flex justify-center">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={800}
            height={800}
            className="w-full max-w-lg rounded-xl object-cover shadow-lg"
            priority
          />
        </div>

        {/* Informações */}
        <div className="flex flex-col justify-start gap-6 text-gray-800">
          <div>
            <span className="text-sm font-medium text-gray-500">Categoria</span>
            <p className="text-lg font-semibold text-gray-700">
              {product.category}
            </p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500">Preço</span>
            <p className="text-3xl font-bold text-blue-600">
              R$ {product.price.toFixed(2)}
            </p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500">Descrição</span>
            <p className="text-base leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-base font-medium">
              📞 Telefone do vendedor:{" "}
              <span className="font-semibold">{product.tel}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
