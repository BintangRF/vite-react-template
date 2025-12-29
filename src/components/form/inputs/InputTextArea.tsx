import { useFormContext } from "react-hook-form";
import { FormField } from "../FormField";

interface Props {
  name: string;
  label: string;
}

export function InputTextarea({ name, label }: Props) {
  const { register } = useFormContext();

  return (
    <FormField name={name} label={label}>
      {({ id, className }) => (
        <textarea
          id={id}
          rows={4}
          {...register(name)}
          className={`${className} resize-none`}
        />
      )}
    </FormField>
  );
}
