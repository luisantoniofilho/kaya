import SigninButton from "../_components/SigninButton";
import SignoutButton from "../_components/SignoutButton";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Login box */}
      <section
        className="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-lg sm:max-w-lg md:max-w-xl md:p-12"
        aria-labelledby="login-title"
      >
        {/* Page title */}
        <h2
          id="login-title"
          className="mb-4 text-center text-3xl font-bold text-gray-800"
        >
          {session ? "Você já está logado!" : "Bem-vindo!"}
        </h2>

        {/* Login prompt */}
        {!session && (
          <div
            className="mb-4 w-full rounded-lg bg-blue-50 p-3 text-center text-blue-700"
            role="alert"
          >
            ⚠️ Faça o login para acessar todo o conteúdo do site
          </div>
        )}

        {/* Instruction text */}
        <p className="mb-6 text-center text-base text-gray-600 md:text-lg">
          {session ? "Deseja sair da sua conta?" : "Login ou criar uma conta"}
        </p>

        {/* Sign-in or Sign-out button */}
        {session ? <SignoutButton /> : <SigninButton />}
      </section>
    </main>
  );
}
