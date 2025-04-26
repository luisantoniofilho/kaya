import Button from "./Button";
import { ProductType } from "../schemas/productSchema";

export default function Product({
  title,
  description,
  price,
  category,
}: ProductType) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg transition hover:shadow-md">
      {/* Product image */}
      {/* <Image
        src={image.src}
        alt={title}
        height={image.height}
        width={image.width}
        className="h-48 w-full object-cover"
      /> */}

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
        <p className="mt-1 text-stone-600">R$ {price}</p>
        <p className="mt-1 text-stone-600">{category}</p>
        <p className="mt-1 text-stone-600">{description}</p>

        <Button type="button">Ver detalhes</Button>
      </div>
    </div>
  );
}
