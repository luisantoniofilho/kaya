import AddOrEditProductForm from "@/app/_components/forms/AddOrEditProductForm";
import getUserSession from "@/app/_helpers/getUserSession";
import { getProductAction, getUserAction } from "@/app/_lib/actions";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;

  // Get session
  const session = await getUserSession();
  if (!session.user?.email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <p className="text-xl text-red-600">Acesso não autorizado.</p>
      </main>
    );
  }

  // Get user from DB
  const { data: user } = await getUserAction(session.user.email);
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <p className="text-xl text-red-600">Usuário não encontrado.</p>
      </main>
    );
  }

  // Get product
  const { data: product, error } = await getProductAction(productId);
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

  // Check if user is the owner of the product
  if (user.id !== product.userId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <p className="text-xl text-red-600">
          Você não tem permissão para editar este produto.
        </p>
      </main>
    );
  }

  // Render form
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
