import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook DELETE data (mutation)
 *
 * Digunakan untuk:
 * - menghapus satu data dari list / table
 * - menghapus data berdasarkan id atau parameter lain
 *
 * Parameter:
 * - queryKey: cache key yang akan di-invalidate setelah sukses
 * - endpoint: function pembentuk endpoint (dinamis & fleksibel)
 *   contoh: (id) => `/todos/${id}`
 * - notifier: optional notifier untuk handle success / error
 * - options: opsi tambahan dari React Query
 *
 * Perilaku otomatis:
 * - menjalankan HTTP DELETE ke endpoint hasil function
 * - invalidate cache berdasarkan queryKey setelah sukses
 * - memanggil notifier.success dengan response backend
 *
 * Catatan penting:
 * - TResponse adalah RESPONSE DARI BACKEND
 * - untuk DELETE, umumnya backend mengembalikan:
 *   { data: null | void; message: string }
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
 * const deleteTodo = useDeleteQuery<
 *   ApiResponse<void>, // response backend (tanpa data)
 *   number             // payload ke endpoint (id)
 * >(
 *   ["todos"],
 *   (id) => `/todos/${id}`,
 *   swalNotifier
 * );
 *
 * deleteTodo.mutate(5);
 */
export function useDeleteQuery<
  TResponse = unknown,
  TVariables = string | number
>(
  queryKey: readonly unknown[],
  endpoint: (variable: TVariables) => string,
  notifier?: NotifyFn<TResponse>,
  options?: UseMutationOptions<TResponse, unknown, TVariables>
) {
  const qc = useQueryClient();

  return useMutation<TResponse, unknown, TVariables>({
    mutationFn: (variable) => api.delete<TResponse>(endpoint(variable)),

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
