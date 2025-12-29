import { useFormContext } from "react-hook-form";
import { FormField } from "../FormField";

interface InputDateProps {
  name: string;
  label: string;
}

export function InputDate({ name, label }: InputDateProps) {
  const { register } = useFormContext();

  return (
    <FormField name={name} label={label}>
      {({ id, className }) => (
        <input id={id} type="date" {...register(name)} className={className} />
      )}
    </FormField>
  );
}
