// pages/UserFormDataForm.tsx
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "@/components/form/FormWrapper";
import { InputText } from "@/components/form/inputs/InputText";
import { InputSelect } from "@/components/form/inputs/InputSelect";
import { InputCheckbox } from "@/components/form/inputs/InputCheckbox";
import { InputFile } from "@/components/form/inputs/InputFile";
import { FormButton } from "@/components/form/FormButton";
import { objectToFormData } from "@/utils/objectToFormData";
import {
  userFormDataSchema,
  type UserFormDataValues,
} from "@/schema/user-formdata.schema";

export function UserFormDataForm(): React.ReactElement {
  return (
    <FormWrapper<UserFormDataValues>
      formOptions={{
        resolver: zodResolver(userFormDataSchema),
        defaultValues: {
          name: "",
          email: "",
          role: "",
          avatar: undefined,
          active: false,
        },
      }}
      onSubmit={(values) => {
        const payload = objectToFormData(values);
        for (const [key, value] of payload.entries()) {
          console.log(key, value);
        }
      }}
      className="space-y-4"
    >
      <InputText name="name" label="Name" />
      <InputText name="email" label="Email" />

      <InputFile name="avatar" label="Avatar" accept="image/*" />

      <InputSelect
        name="role"
        label="Role"
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ]}
      />

      <InputCheckbox name="active" label="Active" />

      <FormButton>Create (FormData)</FormButton>
    </FormWrapper>
  );
}
