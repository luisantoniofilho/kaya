import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";

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
      </nav>
      <Link className="text-cyan-600" href={"/login"}>
        Deseja sair da sua conta? Clique aqui
      </Link>
    </div>
  );
}
