import Product from "@/app/_components/ProductCard";
import { getUserProductsAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) redirect("/login");

  const userProducts = await getUserProductsAction();

  if (!Array.isArray(userProducts)) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
          Meus Anúncios
        </h1>

        {userProducts?.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {userProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-gray-500">
            Você ainda não anunciou nenhum produto.
          </p>
        )}
      </div>
    </main>
  );
}
