"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { deleteProductAction } from "../_lib/actions";
import { ProductType } from "../schemas/productSchema";

export default function UserProductCard({ product }: { product: ProductType }) {
  const router = useRouter();

  // Function to delete product
  async function handleDelete(e: MouseEvent) {
    e.stopPropagation();

    if (!product.id) {
      console.error("Product not found");
      return;
    }

    if (confirm("O seu anúncio sera excluido")) {
      const res = await deleteProductAction(product.id);
      if (res.success) {
        location.reload();
      } else {
        alert("Erro ao excluir o produto");
      }
    }
  }

  function handleCardClick() {
    router.push(`/products/${product.id}`);
  }

  if (!product.imageUrl) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        Imagem não encontrada para o produto: <strong>{product.title}</strong>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="flex cursor-pointer items-center gap-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      {/* Product image */}
      <div className="h-32 w-32 rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={128}
          height={128}
          className="h-full w-full object-contain"
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
        {/* 
        Feature to edit products
        <Link
          onClick={(e) => e.stopPropagation()}
          href={`/account/edit/${product.id}`}
        >
          <PencilSquareIcon className="h-6 w-6 cursor-pointer text-blue-600 hover:text-blue-800" />
        </Link> */}

        <button onClick={handleDelete}>
          <TrashIcon className="h-6 w-6 cursor-pointer text-red-600 hover:text-red-800" />
        </button>
      </div>
    </div>
  );
}
