import AdvertiseProductForm from "../_components/AdvertiseProductForm";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Anunciar Produto
      </h1>

      <AdvertiseProductForm />
    </main>
  );
}
