"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import Link from "next/link";
import { ProductType } from "@/app/schemas/productSchema";
import { deleteProductAction } from "@/app/_lib/actions";

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
      const { data: success, error } = await deleteProductAction(product.id);
      if (success) {
        location.reload();
      } else {
        console.error(error);
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
    <article
      onClick={handleCardClick}
      className="flex cursor-pointer items-center gap-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick();
      }}
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

      <section className="flex-1">
        <header>
          <h2 className="text-xl font-semibold text-gray-800">
            {product.title}
          </h2>
        </header>
        <p className="mt-1 text-gray-600">{product.category}</p>
        <p className="mt-1 font-bold text-blue-600">
          R${product.price.toFixed(2)}
        </p>
        <p className="mt-1 line-clamp-2 text-gray-500">{product.description}</p>
      </section>

      {/* Action buttons */}
      <nav
        aria-label={`Actions for ${product.title}`}
        className="flex flex-col items-center gap-2"
      >
        <Link
          onClick={(e) => e.stopPropagation()}
          href={`/account/listings/edit/${product.id}`}
          aria-label={`Edit ${product.title}`}
        >
          <PencilSquareIcon className="h-6 w-6 cursor-pointer text-blue-600 hover:text-blue-800" />
        </Link>

        <button onClick={handleDelete} aria-label={`Delete ${product.title}`}>
          <TrashIcon className="h-6 w-6 cursor-pointer text-red-600 hover:text-red-800" />
        </button>
      </nav>
    </article>
  );
}
