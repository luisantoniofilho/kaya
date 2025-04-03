const faqs = [
  //   {
  //     question: "Quais são as formas de pagamento aceitas?",
  //     answer: "Aceitamos cartões de crédito, boleto bancário e Pix.",
  //   },
  {
    question: "",
    answer: "",
  },
  {
    question: "Qual é a política de devolução?",
    answer: "Você pode devolver um produto em até 30 dias após o recebimento.",
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
