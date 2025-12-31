import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import type { ApiResponse } from "@/types/api-response.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook PUT untuk UPDATE SATU DATA (DETAIL PAGE)
 *
 * Digunakan untuk:
 * - halaman detail
 * - form edit satu entitas
 * - update data ketika `id` sudah dikunci di endpoint
 *
 * Karakteristik:
 * - endpoint SUDAH mengandung id
 * - payload TIDAK mengandung id
 * - fokus ke update satu resource
 *
 * Standar RESPONSE (DIKUNCI DI SINI):
 * ApiResponse<T> = { data: T; message?: string }
 *
 * Caller:
 * - TIDAK menulis ApiResponse
 * - cukup fokus ke body & data bisnis
 *
 * Contoh penggunaan:
 *
 * type Todo = {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * };
 *
 * type UpdateTodoBody = {
 *   title: string;
 * };
 *
 * const updateTodo = usePutSingleQuery<
 *   Todo,              // data hasil backend
 *   UpdateTodoBody     // body update (tanpa id)
 * >(
 *   ["todos"],
 *   `/todos/${id}`,
 *   swalNotifier
 * );
 *
 * updateTodo.mutate({
 *   title: "Updated",
 * });
 */
export function usePutSingleQuery<TData, TBody = unknown>(
  queryKey: readonly unknown[],
  endpoint: string,
  notifier?: NotifyFn<ApiResponse<TData>>,
  options?: UseMutationOptions<ApiResponse<TData>, unknown, TBody>
) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<TData>, unknown, TBody>({
    mutationFn: (body) => api.put<ApiResponse<TData>, TBody>(endpoint, body),

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
