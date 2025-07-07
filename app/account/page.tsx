import Link from "next/link";
import getUserSession from "../_helpers/getUserSession";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  // Check if the user is authenticated
  await getUserSession();

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
