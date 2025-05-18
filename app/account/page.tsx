import Link from "next/link";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">Minha Conta</h1>
      <nav className="flex space-x-4 border-b pb-2">
        <Link
          href="/account/listings"
          className="text-blue-600 hover:underline"
        >
          Meus Anúncios
        </Link>
        <Link href="/account/sails" className="text-blue-600 hover:underline">
          Minhas Vendas
        </Link>
      </nav>
      <p className="mt-4 text-gray-600">
        Gerencie suas vendas e anúncios aqui.
      </p>
    </div>
  );
}
