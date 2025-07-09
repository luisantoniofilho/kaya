import AddOrEditProductForm from "../_components/forms/AddOrEditProductForm";
import getUserSession from "../_helpers/getUserSession";

export const metadata = {
  title: "Anunciar Produto",
};

export default async function Page() {
  // Check if the user is authenticated
  await getUserSession();

  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      {/* Page title */}
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Anunciar Produto
      </h1>

      {/* Product form component */}
      <AddOrEditProductForm />
    </main>
  );
}
