import Link from "next/link";
import Input from "../_components/Input";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Login</h2>
        <form className="space-y-4">
          <Input name="email" type="email">
            Email
          </Input>
          <Input name="password" type="password" placeholder="Digite sua senha">
            Senha
          </Input>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
