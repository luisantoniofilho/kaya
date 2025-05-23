const faqs = [
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

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Perguntas Frequentes
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex w-full items-center justify-between py-3 text-left text-lg font-medium text-gray-800">
              {faq.question}
            </div>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
