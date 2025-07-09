import Image from "next/image";
import LinkButton from "../ui/LinkButton";
import { ProductType } from "@/app/schemas/productSchema";

export default function ProductCard({ product }: { product: ProductType }) {
  if (!product.imageUrl) throw new Error("Imagem sem URL");

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg transition hover:shadow-md">
      {/* product image */}
      <Image
        src={product.imageUrl}
        alt={product.title}
        height={500}
        width={500}
        className="h-48 w-full object-contain"
      />

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-800">
          {product.title}
        </h3>
        <p className="mt-1 text-stone-600">
          {product.price > 0 ? `R$${product.price}` : "Doação"}
        </p>
        <p className="mt-1 text-stone-600">{product.category}</p>
        <p className="mt-1 text-stone-600">{product.description}</p>

        <LinkButton href={`/products/${product.id}`}>Ver detalhes</LinkButton>
      </div>
    </article>
  );
}
