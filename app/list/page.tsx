import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import AddOrEditProductForm from "../_components/AddOrEditProductForm";

export const metadata = {
  title: "Anunciar Produto",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Anunciar Produto
      </h1>

      <AddOrEditProductForm />
    </main>
  );
}
