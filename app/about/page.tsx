export const metadata = {
  title: "Sobre a Kaya",
};

function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 bg-gray-50 px-6 py-10">
      {/* Introduction */}
      <section aria-labelledby="about-title">
        <h1
          id="about-title"
          className="mb-4 text-4xl font-extrabold text-gray-900"
        >
          Sobre a Kaya
        </h1>
        <p className="text-lg leading-relaxed text-gray-700">
          A Kaya é uma plataforma dedicada a transformar o consumo e o descarte
          de produtos, promovendo a economia circular e contribuindo para a
          sustentabilidade.
        </p>
      </section>

      {/* Circular economy */}
      <section aria-labelledby="circular-economy-title">
        <h2
          id="circular-economy-title"
          className="mb-3 text-3xl font-bold text-gray-800"
        >
          Economia Circular
        </h2>
        <p className="leading-relaxed text-gray-700">
          A economia circular é um modelo que visa maximizar o aproveitamento de
          recursos, reduzindo o desperdício e prolongando o ciclo de vida dos
          produtos. Em vez do modelo tradicional de consumo linear, buscamos um
          sistema sustentável onde cada item pode ser reutilizado, reciclado ou
          reintegrado em novos processos produtivos.
        </p>
      </section>

      {/* Our Proposal */}
      <section aria-labelledby="purpose-title">
        <h2
          id="purpose-title"
          className="mb-3 text-3xl font-bold text-gray-800"
        >
          Nossa Proposta
        </h2>
        <p className="leading-relaxed text-gray-700">
          Conectamos pessoas e empresas para facilitar a doação e a venda de
          produtos usados, desde itens comuns até equipamentos industriais. Ao
          estimular a circulação de produtos, a Kaya ajuda a reduzir a
          necessidade de novos recursos, incentivando práticas mais conscientes
          e responsáveis.
        </p>
      </section>

      {/* Sustentability */}
      <section aria-labelledby="sustainability-title">
        <h2
          id="sustainability-title"
          className="mb-3 text-3xl font-bold text-gray-800"
        >
          Sustentabilidade
        </h2>
        <p className="leading-relaxed text-gray-700">
          Ao promover a reutilização e a economia circular, contribuímos para a
          diminuição da pressão sobre os recursos naturais e a redução dos
          resíduos descartados. Nosso objetivo é fomentar uma cultura de consumo
          consciente e sustentável, onde o reaproveitamento de bens se torna uma
          prática comum para um futuro mais verde.
        </p>
      </section>
    </main>
  );
}

export default Page;
