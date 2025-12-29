export type NotifyFn<T = any> = {
  success?: (response: T) => void;
  error?: (error: unknown) => void;
};
