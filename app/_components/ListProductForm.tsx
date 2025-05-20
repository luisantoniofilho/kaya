"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { addProductAction } from "../_lib/actions";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import SpinnerMini from "./SpinnerMini";

export default function ListProductForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      // String error
      const { error } = await addProductAction(formData);

      /* Error example
      ✖ Título muito curto
      → at title */

      if (error) {
        console.error(error);

        error
          // Split the error string into lines
          .split("\n")
          // Keep only the lines that contain error messages
          .filter((line) => line.startsWith("✖"))
          // Remove the ✖ symbol and trim whitespace
          .map((line) => line.replace("✖", "").trim())
          // Filter out any empty or falsy values
          .filter(Boolean)
          // Display each error message using a toast
          .forEach((msg) => toast.error(msg, { duration: 4000 }));

        return;
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

      {/* Product category */}
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
      <Input
        type="file"
        accept=".png, .jpg, .jpeg, .webp"
        name="image"
        optionalClassName="cursor-pointer"
      >
        Imagem
      </Input>

      {/* Phone */}
      <Input
        type="tel"
        name="tel"
        minLength={11}
        maxLength={11}
        placeholder="11912345678"
      >
        Telefone para contato com DDD (insira somente números)
      </Input>

      <Button type="submit" disable={isPending}>
        {isPending ? <SpinnerMini /> : "Anunciar produto"}
      </Button>
    </form>
  );
}
