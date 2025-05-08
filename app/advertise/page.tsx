import { redirect } from "next/navigation";
import AdvertiseProductForm from "../_components/AdvertiseProductForm";
import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/login");

  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Anunciar Produto
      </h1>

      <AdvertiseProductForm />
    </main>
  );
}
