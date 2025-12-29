// components/form/FormField.tsx
import { get, useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  children: (props: {
    id: string;
    error?: any;
    className: string;
  }) => React.ReactNode;
}

export function FormField({ name, label, children }: FormFieldProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
  const id = name;

  const baseClass =
    "rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2";

  const className = error
    ? `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500`
    : `${baseClass} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {children({ id, error, className })}

      {error?.message && (
        <small className="text-xs text-red-500">{String(error.message)}</small>
      )}
    </div>
  );
}
