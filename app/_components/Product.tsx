import Image from "next/image";
import { ProductType } from "../schemas/productSchema";
import LinkButton from "./LinkButton";

export default function Product({
  id,
  title,
  description,
  price,
  category,
  imagePath,
}: ProductType) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg transition hover:shadow-md">
      {/* Product image */}
      <Image
        src={imagePath}
        alt={title}
        height={500}
        width={500}
        className="h-48 w-full object-cover"
      />

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
        <p className="mt-1 text-stone-600">R$ {price}</p>
        <p className="mt-1 text-stone-600">{category}</p>
        <p className="mt-1 text-stone-600">{description}</p>

        <LinkButton href={`/products/${id}`}>Ver detalhes</LinkButton>
      </div>
    </div>
  );
}
