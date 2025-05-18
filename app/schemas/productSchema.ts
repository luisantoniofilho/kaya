import { z } from "zod";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";

/* The vercel blob limit is 4.5mb
1 MB = 1024 * 1024 bytes = 1_048_576 bytes
4.5 MB = 4.5 * 1_048_576 = 4_718_592 bytes
*/
const MAX_FILE_SIZE = 4_718_592;

export const productSchema = z.object({
  id: z.string().optional(),
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
      { message: "Escolha uma imagem válida" },
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message:
        "O tamanho da imagem está muito grande, escolha uma imagem menor",
    })
    .optional(),
  imageUrl: z.string().optional(),
  phone: z.coerce
    .string({
      required_error: "Telefone é obrigatório",
      invalid_type_error: "Telefone deve ser uma string",
    })
    .regex(/^\d{11}$/, "Digite um número de telefone com 11 dígitos"),
  userId: z.string().length(24, "ID inválido"),
});

export type ProductType = z.infer<typeof productSchema>;
