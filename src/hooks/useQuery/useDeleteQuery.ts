import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import type { ApiResponse } from "@/types/api-response.types";
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
 * Standar RESPONSE (DIKUNCI DI SINI):
 * ApiResponse<T> = { data: T; message?: string }
 *
 * Caller:
 * - TIDAK perlu menulis ApiResponse
 * - cukup fokus ke tipe data bisnis
 *
 * Contoh penggunaan:
 *
 * type Todo = {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * };
 *
 * const deleteTodo = useDeleteQuery<
 *   void,   // data hasil delete (biasanya kosong)
 *   number  // id yang dikirim ke endpoint
 * >(
 *   ["todos"],
 *   (id) => `/todos/${id}`,
 *   swalNotifier
 * );
 *
 * deleteTodo.mutate(5);
 */
export function useDeleteQuery<TData = void, TVariables = string | number>(
  queryKey: readonly unknown[],
  endpoint: (variable: TVariables) => string,
  notifier?: NotifyFn<ApiResponse<TData>>,
  options?: UseMutationOptions<ApiResponse<TData>, unknown, TVariables>
) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<TData>, unknown, TVariables>({
    mutationFn: (variable) =>
      api.delete<ApiResponse<TData>>(endpoint(variable)),

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
