import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">Minha Conta</h1>
      <nav className="flex space-x-4 border-b pb-2">
        <Link href="/account/sails" className="text-blue-600 hover:underline">
          Minhas Vendas
        </Link>
        <Link
          href="/account/listings"
          className="text-blue-600 hover:underline"
        >
          Meus Anúncios
        </Link>
      </nav>
      <p className="mt-4 text-gray-600">
        Gerencie suas vendas e anúncios aqui.
      </p>
    </div>
  );
}
