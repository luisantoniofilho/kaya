export default function Page() {
  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Anunciar Produto
      </h1>

      <form className="space-y-4">
        {/* Title input */}
        <div>
          <label className="block font-medium text-gray-700">Título</label>
          <input
            required
            type="text"
            placeholder="Ex: Mesa de Escritório"
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description input */}
        <div>
          <label className="block font-medium text-gray-700">Descrição</label>
          <textarea
            required
            placeholder="Detalhes sobre o produto"
            className="h-24 w-full resize-none rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Price input */}
        <div>
          <label className="block font-medium text-gray-700">Preço (R$)</label>
          <input
            required
            type="number"
            placeholder="Ex: 250"
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Image input */}
        <div>
          <label className="block font-medium text-gray-700">Imagem</label>
          <input
            required
            type="file"
            className="w-full cursor-pointer rounded-md border border-gray-300 p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Anunciar
        </button>
      </form>
    </main>
  );
}
