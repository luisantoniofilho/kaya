import UserProductCard from "@/app/_components/UserProductCard";
import { getUserProductsAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Meus Anúncios",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  const { data: userProducts, error } = await getUserProductsAction();

  if (error) {
    console.error(error);
    return (
      <div>
        <p>Ocorreu um erro ao carregar os seus anúncios</p>
      </div>
    );
  }

  if (!userProducts || userProducts?.length === 0)
    if (error) {
      console.error(error);
      return (
        <div>
          <p>Ocorreu um erro ao carregar os seus anúncios.</p>
        </div>
      );
    }

  if (!userProducts || userProducts.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
            Meus Anúncios
          </h1>
          <p className="mt-10 text-gray-500">
            Você ainda não anunciou nenhum produto.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
          Meus Anúncios
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userProducts.map((product) => (
            <UserProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
