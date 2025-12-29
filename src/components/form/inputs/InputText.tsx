import { useFormContext } from "react-hook-form";
import { FormField } from "../FormField";

interface InputTextProps {
  name: string;
  label: string;
  type?: string;
}

export function InputText({ name, label, type = "text" }: InputTextProps) {
  const { register } = useFormContext();

  return (
    <FormField name={name} label={label}>
      {({ id, className }) => (
        <input id={id} type={type} {...register(name)} className={className} />
      )}
    </FormField>
  );
}
