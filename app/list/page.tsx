import { redirect } from "next/navigation";
import ListProductForm from "../_components/ListProductForm";
import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Anunciar Produto
      </h1>

      <ListProductForm />
    </main>
  );
}
