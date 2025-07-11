const faqs = [
  // List of FAQ questions and answers
  {
    question: "Preciso criar uma conta para anunciar um produto?",
    answer:
      "Sim, é necessário entrar com sua conta Google para anunciar um produto no site.",
  },
  {
    question: "Qual é a política de devolução?",
    answer:
      "A política de devolução depende de cada vendedor. Recomendamos combinar diretamente com o responsável pelo produto.",
  },
  {
    question: "Como faço para comprar um produto?",
    answer:
      "Cada produto possui uma forma de contato específica. Basta usar esse canal para conversar diretamente com o vendedor e finalizar a compra.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Armazenamos apenas seu nome e e-mail com segurança e usamos a autenticação do Google para proteger seu acesso.",
  },
  {
    question: "Vocês intermediam os pagamentos?",
    answer:
      "Não. As compras são feitas diretamente com o vendedor, fora da plataforma.",
  },
  {
    question: "Quem pode anunciar produtos?",
    answer:
      "Apenas usuários autorizados e cadastrados podem adicionar novos produtos.",
  },
];

export const metadata = {
  title: "Perguntas Frequentes",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      {/* Page heading */}
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Perguntas Frequentes
      </h1>

      {/* FAQ list */}
      <section aria-label="Frequently asked questions" className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            {/* Question */}
            <h2 className="flex w-full items-center justify-between py-3 text-left text-lg font-medium text-gray-800">
              {faq.question}
            </h2>

            {/* Answer */}
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
