import Link from "next/link";
import getUserSession from "../_helpers/getUserSession";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  // Check if the user is authenticated
  await getUserSession();

  return (
    <main className="mx-auto max-w-lg p-6">
      {/* Page title */}
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Minha Conta</h1>

      {/* Account navigation */}
      <nav aria-label="Navegação da conta" className="mb-6">
        <ul className="flex space-x-3 border-b pb-2">
          <li>
            <Link
              href="/account/listings"
              className="inline-block rounded-md px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Meus Anúncios
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sign out section */}
      <section aria-label="Sair da conta" className="mt-8">
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">
            Deseja sair da sua conta?{" "}
            <Link
              href="/login"
              className="font-medium text-red-600 underline hover:text-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              Clique aqui para sair
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
