import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "../FormField";

interface InputFileMultipleProps {
  name: string;
  label: string;
  accept?: string;
}

export function InputFileMultiple({
  name,
  label,
  accept,
}: InputFileMultipleProps) {
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
              multiple
              accept={accept}
              className={className}
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                field.onChange(files);
              }}
            />
          )}
        </FormField>
      )}
    />
  );
}
