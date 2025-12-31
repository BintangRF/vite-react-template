export type NotifyFn<T extends { message?: string }> = {
  success?: (response: T) => void;
  error?: (error: unknown) => void;
};
