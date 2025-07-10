"use client";

import { redirect } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { addProductAction, updateProductAction } from "../../_lib/actions";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";
import { ProductType } from "../../schemas/productSchema";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import SpinnerMini from "../ui/SpinnerMini";

export default function AddOrEditProductForm({
  product = null,
}: {
  product?: ProductType | null;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const { error } = product
        ? await updateProductAction(formData)
        : await addProductAction(formData);

      // String error

      /* Error example from Zod
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

      toast.success("Produto editado com sucesso!");
      redirect("/account/listings");
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Title input */}

      {product?.id && (
        <input type="hidden" name="id" value={Number(product.id)} />
      )}

      <Input
        type="text"
        name="title"
        placeholder="Ex: Mesa de Escritório"
        defaultValue={product?.title || ""}
        minLength={3}
      >
        Título
      </Input>

      {/* Description input */}
      <Input
        type="textarea"
        name="description"
        placeholder="Detalhes sobre o produto"
        defaultValue={product?.description || ""}
        minLength={3}
      >
        Descrição
      </Input>

      {/* Product category */}
      <Select
        label="Categoria"
        name="category"
        options={PRODUCT_CATEGORIES.slice()}
        defaultValue={product?.category || ""}
      />

      {/* Price input */}
      <Input
        type="number"
        name="price"
        placeholder="Ex: 250"
        defaultValue={product?.price}
        min={0}
      >
        Preço (R$)
      </Input>

      {/* Image input */}
      <Input
        type="file"
        accept=".png, .jpg, .jpeg, .webp"
        name="image"
        optionalClassName="cursor-pointer"
        disabled={!!product?.imageUrl}
      >
        Imagem
      </Input>

      {/* Phone */}
      <Input
        type="text"
        name="contactNumber"
        minLength={11}
        maxLength={11}
        placeholder="11912345678"
        defaultValue={product?.contactNumber}
      >
        Telefone para contato com DDD (insira somente números)
      </Input>

      <Button type="submit" disable={isPending}>
        {isPending ? (
          <SpinnerMini />
        ) : product ? (
          "Confirmar alterações"
        ) : (
          "Anunciar produto"
        )}
      </Button>
    </form>
  );
}
