export function objectToFormData<T extends Record<string, any>>(data: T) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value) && value.every((v) => v instanceof File)) {
      value.forEach((file) => formData.append(key, file));
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
}
