import Image from "next/image";

export type ProductProps = {
  title: string;
  description: string;
  image: {
    src: string;
    height: number;
    width: number;
  };
  price: number;
};

export default function Product({ title, price, image }: ProductProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg transition hover:shadow-md">
      {/* Product image */}
      <Image
        src={image.src}
        alt={title}
        height={image.height}
        width={image.width}
        className="h-48 w-full object-cover"
      />

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
        <p className="mt-1 text-stone-600">R$ {price}</p>

        <button className="mt-4 w-full cursor-pointer rounded-lg bg-cyan-700 py-2 text-white transition duration-300 hover:bg-cyan-400 hover:text-stone-700">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
