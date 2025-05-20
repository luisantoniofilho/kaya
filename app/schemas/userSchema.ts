import { z } from "zod/v4";

export const userSchema = z.object({
  id: z.string().length(24).optional(),
  name: z.string().min(2, { error: "Forneça um nome válido" }),
  email: z.string().min(1, { error: "Forneça um email válido" }),
});

export type UserType = z.infer<typeof userSchema>;
