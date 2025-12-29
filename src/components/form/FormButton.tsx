// components/form/FormButton.tsx
import { useFormContext } from "react-hook-form";

interface FormButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
}

export function FormButton({
  children,
  type = "submit",
  disabled,
}: FormButtonProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const isDisabled = disabled || isSubmitting || !isValid;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-md px-4 py-2 text-sm font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2

        ${
          isDisabled
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
        }
      `}
    >
      {isSubmitting && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {isSubmitting ? "Processing..." : children}
    </button>
  );
}
