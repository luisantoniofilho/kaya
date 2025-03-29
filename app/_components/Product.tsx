type ProductProps = {
  imgSrc: string;
  title: string;
  price: number;
};

export default function Product({ imgSrc, title, price }: ProductProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border p-4 shadow-sm">
      <img
        src={imgSrc}
        alt={title}
        width={40}
        height={40}
        className="h-40 w-full rounded-md object-cover"
      />
      <h3 className="mt-4 font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600">R$ {price}</p>
      <button className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700">
        Comprar
      </button>
    </div>
  );
}
