import getProductAction, { getProductsAction } from "@/app/_lib/actions";
import Image from "next/image";

export const revalidate = 60;

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
  // Get the productId from the URL
  const { productId } = await params;

  const product = await getProductAction(productId);

  if (!product) return;

  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Product image */}
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <Image
            src={product.imagePath}
            alt={product.title}
            height={1000}
            width={1000}
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
