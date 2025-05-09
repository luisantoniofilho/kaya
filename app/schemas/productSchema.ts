import { z } from "zod";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";

export const productSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().min(3, "Descrição muito curta"),
  category: z.enum(PRODUCT_CATEGORIES, {
    errorMap: () => ({ message: "Selecione uma categoria válida" }),
  }),
  price: z.coerce
    .number({
      invalid_type_error: "Digite um número válido",
    })
    .positive("O preço não pode ser negativo"),
  imagePath: z.string(),
});

export type ProductType = z.infer<typeof productSchema>;
