import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "../FormField";

interface InputFileProps {
  name: string;
  label: string;
  accept?: string;
}

export function InputFile({ name, label, accept }: InputFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormField name={name} label={label}>
          {({ id, className }) => (
            <input
              id={id}
              type="file"
              accept={accept}
              className={className}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                field.onChange(file);
              }}
            />
          )}
        </FormField>
      )}
    />
  );
}
