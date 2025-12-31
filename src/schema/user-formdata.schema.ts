import { z } from "zod";

export const userFormDataSchema = z.object({
  name: z.string().min(1, "Nama wajib"),
  email: z.email("Email tidak valid"),
  role: z.string().min(1, "Role wajib"),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= 2_000_000, "Max 2MB")
    .optional(),
  active: z.boolean().optional(),
});

export type UserFormDataValues = z.infer<typeof userFormDataSchema>;
