import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook POST data (CREATE / SUBMIT FORM)
 *
 * Digunakan untuk:
 * - membuat data baru
 * - submit form ke backend
 *
 * Parameter:
 * - queryKey: cache key yang akan di-invalidate setelah sukses
 * - endpoint: endpoint API tujuan POST
 * - notifier: optional notifier untuk handle success / error
 * - options: opsi tambahan dari React Query
 *
 * Perilaku otomatis:
 * - menjalankan HTTP POST ke endpoint
 * - mengirim payload (TVariables) ke backend
 * - invalidate cache berdasarkan queryKey setelah sukses
 * - memanggil notifier.success dengan response backend
 *
 * Catatan penting:
 * - TResponse adalah RESPONSE DARI BACKEND
 * - backend umumnya mengembalikan wrapper:
 *   { data: T; message?: string }
 * - constraint `extends { message?: string }`
 *   memastikan notifier dapat membaca message
 *
 * Contoh penggunaan:
 *
 * type ApiResponse<T> = {
 *   data: T;
 *   message?: string;
 * };
 *
 * type Todo = {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * };
 *
 * type CreateTodoPayload = {
 *   title: string;
 * };
 *
 * const createTodo = usePostQuery<
 *   ApiResponse<Todo>,     // response backend
 *   CreateTodoPayload      // payload request
 * >(
 *   ["todos"],
 *   "/todos",
 *   swalNotifier
 * );
 *
 * createTodo.mutate({
 *   title: "Belajar TypeScript"
 * });
 */
export function usePostQuery<
  TResponse extends { message?: string },
  TVariables = unknown
>(
  queryKey: readonly unknown[],
  endpoint: string,
  notifier?: NotifyFn<TResponse>,
  options?: UseMutationOptions<TResponse, unknown, TVariables>
) {
  const qc = useQueryClient();

  return useMutation<TResponse, unknown, TVariables>({
    mutationFn: (payload) => api.post<TResponse, TVariables>(endpoint, payload),

    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey });
      notifier?.success?.(res);
    },

    onError: (err) => {
      notifier?.error?.(err);
    },

    ...options,
  });
}
