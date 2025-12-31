import { z } from "zod";

export const userJsonSchema = z.object({
  name: z.string().min(1, "Nama wajib"),
  email: z.email("Email tidak valid"),
  role: z.string().min(1, "Role wajib"),
  active: z.boolean().optional(),
});

export type UserJsonFormValues = z.infer<typeof userJsonSchema>;
