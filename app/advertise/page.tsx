import Input from "../_components/Input";
import Select from "../_components/Select";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Anunciar Produto
      </h1>

      <form className="space-y-4">
        {/* Title input */}
        <Input type="text" placeholder="Ex: Mesa de Escritório">
          Título
        </Input>

        {/* Description input */}
        <Input type="textarea" placeholder="Detalhes sobre o produto">
          Descrição
        </Input>

        <Select
          label="Categoria"
          name="category"
          options={[
            "Maquina industrial",
            "Eletrodoméstico",
            "Utensílios",
            "Material de obra",
            "Ferramentas",
            "Matéria prima",
            "Mobília",
            "Papelaria",
            "Papelaria",
            "Roupas",
            "Equipamentos",
            "Componentes eletrônicos",
          ]}
        />

        {/* Price input */}
        <Input type="number" placeholder="Ex: 250">
          Preço (R$)
        </Input>

        {/* Image input */}
        <Input type="file" optionalClassName="cursor-pointer">
          Imagem
        </Input>

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
