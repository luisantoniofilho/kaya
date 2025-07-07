import UserProductCard from "@/app/_components/UserProductCard";
import getUserSession from "@/app/_helpers/getUserSession";
import { getUserProductsAction } from "@/app/_lib/actions";

export const metadata = {
  title: "Meus Anúncios",
};

export default async function Page() {
  // Check if the user is authenticated
  await getUserSession();

  // Fetch user's products and error state
  const { data: userProducts, error } = await getUserProductsAction();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <h1 className="mb-8 text-3xl font-extrabold text-gray-800">
          Meus Anúncios
        </h1>

        {/* Products list or status messages */}
        <section
          aria-label="Lista de produtos anunciados"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {error ? (
            // Show error message if loading failed
            <div className="col-span-full text-center">
              <p className="text-red-600">
                Ocorreu um erro ao carregar os seus anúncios. Tente novamente
                mais tarde.
              </p>
            </div>
          ) : !userProducts || userProducts.length === 0 ? (
            // Show empty state if no products found
            <div className="col-span-full py-10 text-center">
              <p className="text-gray-500">
                Você ainda não anunciou nenhum produto.
              </p>
            </div>
          ) : (
            // Render product cards
            userProducts.map((product) => (
              <UserProductCard key={product.id} product={product} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}
