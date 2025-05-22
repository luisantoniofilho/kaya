"use client";

import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ProductType } from "../schemas/productSchema";
import Link from "next/link";
import { deleteProductAction } from "../_lib/actions";

export default function UserProductCard({ product }: { product: ProductType }) {
  async function handleClick() {
    const productId = product.id;
    if (!productId) {
      console.error("Product not found");
      return;
    }

    if (confirm("O seu anúncio sera excluido"))
      await deleteProductAction(productId);
  }

  if (!product.imageUrl) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        Imagem não encontrada para o produto: <strong>{product.title}</strong>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Product image */}
      <div className="h-32 w-32 rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={128}
          height={128}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product information */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
        <p className="mt-1 text-gray-600">{product.category}</p>
        <p className="mt-1 font-bold text-blue-600">
          R${product.price.toFixed(2)}
        </p>
        <p className="mt-1 line-clamp-2 text-gray-500">{product.description}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-2">
        <Link href={`/account/edit/${product.id}`}>
          <PencilSquareIcon className="h-6 w-6 cursor-pointer text-blue-600 hover:text-blue-800" />
        </Link>

        <button onClick={handleClick}>
          <TrashIcon className="h-6 w-6 cursor-pointer text-red-600 hover:text-red-800" />
        </button>
      </div>
    </div>
  );
}
