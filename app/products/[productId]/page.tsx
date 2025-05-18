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
  const { productId } = await params;
  const product = await getProductAction(productId);

  if (!product) return;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 md:px-12">
      {/* Title */}
      <div className="mb-8 w-[90%] max-w-7xl text-left">
        <h1 className="text-4xl font-extrabold text-gray-800">
          {product.title}
        </h1>
      </div>

      {/* Image + Category and Info side by side */}
      <div className="flex w-[90%] max-w-7xl flex-col gap-12 md:flex-row md:items-start">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={1200}
            height={1200}
            className="h-auto w-full rounded-lg object-cover shadow-xl"
            priority
          />
        </div>

        {/* Info */}
        <div className="w-full space-y-6 md:w-1/2">
          <h3 className="text-xl font-medium text-gray-600">
            Categoria:{" "}
            <span className="font-semibold text-gray-800">
              {product.category}
            </span>
          </h3>

          <p className="text-4xl font-bold text-blue-600">
            R$ {product.price.toFixed(2)}
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            {product.description}
          </p>

          <p className="text-lg text-gray-800">
            📞{" "}
            <span className="font-semibold">
              Telefone do vendedor: {product.phone}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
