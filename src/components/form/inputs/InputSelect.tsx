import { useFormContext } from "react-hook-form";
import { FormField } from "../FormField";

interface Option {
  label: string;
  value: string | number;
}

interface InputSelectProps {
  name: string;
  label: string;
  options: Option[];
}

export function InputSelect({ name, label, options }: InputSelectProps) {
  const { register } = useFormContext();

  return (
    <FormField name={name} label={label}>
      {({ id, className }) => (
        <select id={id} {...register(name)} className={className}>
          <option value="">-- pilih --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </FormField>
  );
}
