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

  // Extract productId from params
  const { productId } = await params;

  // Handle missing productId
  if (!productId) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-700">
            Produto não encontrado
          </h1>
          <p className="text-gray-600">
            O ID do produto não foi fornecido ou é inválido.
          </p>
        </div>
      </main>
    );
  }

  // Fetch product data
  const { data: product, error } = await getProductAction(productId);

  // Handle error or missing product data
  if (!product || error) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-700">
            Produto não encontrado
          </h1>
          <p className="text-gray-600">
            Não foi possível carregar as informações do produto. Verifique o ID
            ou tente novamente mais tarde.
          </p>
        </div>
      </main>
    );
  }

  // Render the edit product form with fetched data
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <article
        className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md"
        aria-labelledby="edit-product-title"
      >
        <h1
          id="edit-product-title"
          className="mb-6 text-center text-3xl font-bold text-gray-800"
        >
          Editar Produto
        </h1>

        <AddOrEditProductForm product={product} />
      </article>
    </main>
  );
}
