// schemas/user.schema.ts
import { z } from "zod";
import React from "react";
import { FormWrapper } from "@/components/form/FormWrapper";
import { InputText } from "@/components/form/inputs/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSelect } from "@/components/form/inputs/InputSelect";
import { InputCheckbox } from "@/components/form/inputs/InputCheckbox";
import { FormButton } from "@/components/form/FormButton";

export const userSchema = z.object({
  name: z.string().min(1, "Nama wajib"),
  email: z.email("Email tidak valid"),
  role: z.string().min(1, "Role wajib"),
  active: z.boolean().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export default function Form(): React.ReactElement {
  return (
    <div className="flex items-center justify-center h-full">
      <FormWrapper<UserFormValues>
        formOptions={{
          resolver: zodResolver(userSchema),
          defaultValues: {
            name: "",
            email: "",
            role: "",
            active: false,
          },
        }}
        onSubmit={(values) => {
          const list = Object.values(values)
            .map((v, i) => `${i + 1}. ${v}`)
            .join("\n");

          alert(list);
        }}
        className="min-w-md max-w-xl"
      >
        <InputText name="name" label="Name" />
        <InputText name="email" label="Email" />
        <InputSelect
          name="role"
          label="Role"
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
        />
        <InputCheckbox name="active" label="Active" />
        <FormButton>Create</FormButton>
      </FormWrapper>
    </div>
  );
}
