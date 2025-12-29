import {
  FormProvider,
  useForm,
  type FieldValues,
  type UseFormProps,
} from "react-hook-form";
import React from "react";

/**
 * ============================================================
 * FORM WRAPPER + FORM INPUTS (REACT HOOK FORM)
 * ============================================================
 *
 * Konsep FINAL:
 * - FormWrapper bertanggung jawab MEMBUAT useForm()
 * - mode default: "onChange" (anti-lupa)
 * - useForm() TIDAK dipanggil di luar
 * - Semua input mengambil context via useFormContext()
 * - Mendukung CREATE & UPDATE TANPA ubah struktur form
 *
 * ============================================================
 * 1. DEFINISIKAN SCHEMA & TYPE (OPSIONAL, DISARANKAN)
 * ============================================================
 *
 * import { z } from "zod";
 *
 * export const userSchema = z.object({
 *   name: z.string().min(1, "Nama wajib"),
 *   email: z.string().email("Email tidak valid"),
 *   role: z.string().min(1, "Role wajib"),
 *   active: z.boolean().optional(),
 * });
 *
 * export type UserFormValues = z.infer<typeof userSchema>;
 *
 * ============================================================
 * 2. CREATE MODE
 * ============================================================
 *
 * <FormWrapper<UserFormValues>
 *   onSubmit={(values) => {
 *     console.log("CREATE DATA", values);
 *   }}
 *   formOptions={{
 *     resolver: zodResolver(userSchema),
 *     defaultValues: {
 *       name: "",
 *       email: "",
 *       role: "",
 *       active: false,
 *     },
 *   }}
 * >
 *   <InputText name="name" label="Name" />
 *   <InputText name="email" label="Email" />
 *
 *   <InputSelect
 *     name="role"
 *     label="Role"
 *     options={[
 *       { label: "Admin", value: "admin" },
 *       { label: "User", value: "user" },
 *     ]}
 *   />
 *
 *   <InputCheckbox name="active" label="Active" />
 *
 *   <FormButton>Create</FormButton>
 * </FormWrapper>
 *
 * ============================================================
 * 3. UPDATE MODE
 * ============================================================
 *
 * <FormWrapper<UserFormValues>
 *   onSubmit={(values) => {
 *     console.log("UPDATE DATA", values);
 *   }}
 *   formOptions={{
 *     resolver: zodResolver(userSchema),
 *     defaultValues: {
 *       name: "John",
 *       email: "john@mail.com",
 *       role: "admin",
 *       active: true,
 *     },
 *   }}
 * >
 *   <InputText name="name" label="Name" />
 *   <InputText name="email" label="Email" />
 *
 *   <InputSelect
 *     name="role"
 *     label="Role"
 *     options={[
 *       { label: "Admin", value: "admin" },
 *       { label: "User", value: "user" },
 *     ]}
 *   />
 *
 *   <InputCheckbox name="active" label="Active" />
 *
 *   <FormButton>Update</FormButton>
 * </FormWrapper>
 *
 * ============================================================
 */

interface FormWrapperProps<TValues extends FieldValues> {
  onSubmit: (values: TValues) => void;
  children: React.ReactNode;
  formOptions: UseFormProps<TValues>;
  className?: string;
}

export function FormWrapper<TValues extends FieldValues>({
  onSubmit,
  children,
  formOptions,
  className,
}: FormWrapperProps<TValues>) {
  const form = useForm<TValues>({
    mode: "onChange",
    ...formOptions,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`
          flex flex-col gap-4
          rounded-lg bg-white p-6
          shadow-sm
          ${className ?? ""}
        `}
      >
        {children}
      </form>
    </FormProvider>
  );
}
