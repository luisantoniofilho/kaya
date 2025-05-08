import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Forneça um nome válido"),
  email: z.string().min(1, "Forneça um email válido"),
});

export type UserType = z.infer<typeof userSchema>;
