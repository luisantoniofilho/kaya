"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { addProductAction } from "../_lib/actions";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import SpinnerMini from "./SpinnerMini";

export default function AdvertiseProductForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addProductAction(formData);

      if (result?.error) {
        Object.entries(result.error.fieldErrors).forEach(([key, value]) => {
          console.error(`${key}: ${value}`);
          toast.error(`${key.toString()}: ${value.toString()}`);
        });
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Title input */}
      <Input type="text" name="title" placeholder="Ex: Mesa de Escritório">
        Título
      </Input>

      {/* Description input */}
      <Input
        type="textarea"
        name="description"
        placeholder="Detalhes sobre o produto"
      >
        Descrição
      </Input>

      <Select
        label="Categoria"
        name="category"
        options={PRODUCT_CATEGORIES.slice()}
      />

      {/* Price input */}
      <Input type="number" name="price" placeholder="Ex: 250">
        Preço (R$)
      </Input>

      {/* Image input */}
      <Input type="file" name="image" optionalClassName="cursor-pointer">
        Imagem
      </Input>

      <Button type="submit" disable={isPending}>
        {isPending ? <SpinnerMini /> : "Anunciar produto"}
      </Button>
    </form>
  );
}
