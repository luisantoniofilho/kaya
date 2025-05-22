import { z } from "zod/v4";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";

/* The vercel blob limit is 4.5mb
1 MB = 1024 * 1024 bytes = 1_048_576 bytes
4.5 MB = 4.5 * 1_048_576 = 4_718_592 bytes
*/
const MAX_FILE_SIZE = 4_718_592;

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { error: "Título muito curto" }),
  description: z.string().min(3, { error: "Descrição muito curta" }),
  category: z.enum(PRODUCT_CATEGORIES, {
    error: "Selecione uma categoria válida",
  }),
  price: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Esse campo é obrigatório"
          : "Digite um número válido",
    })
    .positive("O preço não pode ser negativo"),
  image: z
    .instanceof(File)
    .refine(
      (file) => {
        const imageTypes = [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
        ];
        return imageTypes.includes(file.type);
      },
      { error: "Escolha uma imagem válida" },
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      error: "O tamanho da imagem está muito grande, escolha uma imagem menor",
    })
    .optional(),
  imageUrl: z.string().optional(),
  tel: z
    .string()
    .min(11, { error: "Telefone é obrigatório" })
    .refine((val) => /^\d{11}$/.test(val), {
      error: "Digite um telefone válido com 11 dígitos",
    }),
  userId: z.string().length(24, "ID inválido"),
});

export type ProductType = z.infer<typeof productSchema>;
