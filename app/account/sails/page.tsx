export const metadata = {
  title: "Sails",
};

export default function Page() {
  const sales = [
    { id: 1, product: "Notebook Dell", price: 3500, status: "Vendido" },
    { id: 2, product: "Cadeira Gamer", price: 850, status: "Em andamento" },
    { id: 3, product: "Mesa de Escritório", price: 400, status: "Disponível" },
  ];

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Minhas Vendas</h1>
      <div className="space-y-4">
        {sales.map((sale) => (
          <article key={sale.id} className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{sale.product}</h2>
            <p className="text-gray-600">R$ {sale.price}</p>
            <span className="text-sm text-gray-500">Status: {sale.status}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
