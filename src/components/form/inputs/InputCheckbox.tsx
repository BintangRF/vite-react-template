import { useFormContext } from "react-hook-form";

interface InputCheckboxProps {
  name: string;
  label: string;
}

export function InputCheckbox({ name, label }: InputCheckboxProps) {
  const { register } = useFormContext();

  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        {...register(name)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
      />
      {label}
    </label>
  );
}
