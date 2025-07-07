import AddOrEditProductForm from "@/app/_components/AddOrEditProductForm";
import getUserSession from "@/app/_helpers/getUserSession";
import { getProductAction } from "@/app/_lib/actions";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  // Check if the user is authenticated
  getUserSession();

  const { productId } = await params;

  console.log(productId);
  if (!productId) {
    return (
      <div>
        <h1>Esse produto não foi encontrado</h1>
      </div>
    );
  }

  const { data: product } = await getProductAction(productId);

  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Editar Produto
      </h1>

      <AddOrEditProductForm product={product} />
    </main>
  );
}
