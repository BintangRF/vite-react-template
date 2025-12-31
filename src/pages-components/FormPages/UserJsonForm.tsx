// pages/UserJsonForm.tsx
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "@/components/form/FormWrapper";
import { InputText } from "@/components/form/inputs/InputText";
import { InputSelect } from "@/components/form/inputs/InputSelect";
import { InputCheckbox } from "@/components/form/inputs/InputCheckbox";
import { FormButton } from "@/components/form/FormButton";
import {
  userJsonSchema,
  type UserJsonFormValues,
} from "@/schema/user-json.schema";

export function UserJsonForm(): React.ReactElement {
  return (
    <FormWrapper<UserJsonFormValues>
      formOptions={{
        resolver: zodResolver(userJsonSchema),
        defaultValues: {
          name: "",
          email: "",
          role: "",
          active: false,
        },
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      className="space-y-4"
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

      <FormButton>Create (JSON)</FormButton>
    </FormWrapper>
  );
}
