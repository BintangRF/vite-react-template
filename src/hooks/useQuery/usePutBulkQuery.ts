import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import type { ApiResponse } from "@/types/api-response.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook PUT untuk UPDATE data dari LIST / TABLE (bulk-style)
 *
 * Digunakan untuk:
 * - update data dari DataTable
 * - modal edit
 * - inline edit (row-based)
 *
 * Karakteristik:
 * - payload WAJIB mengandung `id`
 * - `id` dipakai untuk membentuk endpoint
 * - body request otomatis mengecualikan `id`
 *
 * Standar RESPONSE (DIKUNCI DI SINI):
 * ApiResponse<T> = { data: T; message?: string }
 *
 * Caller:
 * - TIDAK menulis ApiResponse
 * - fokus ke payload & data bisnis
 *
 * Contoh penggunaan:
 *
 * type Todo = {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * };
 *
 * type UpdateTodoPayload = {
 *   id: number;
 *   title: string;
 * };
 *
 * const updateTodo = usePutBulkQuery<
 *   UpdateTodoPayload, // payload (WAJIB ada id)
 *   Todo               // data hasil backend
 * >(
 *   ["todos"],
 *   (id) => `/todos/${id}`,
 *   swalNotifier
 * );
 *
 * updateTodo.mutate({
 *   id: 5,
 *   title: "Updated",
 * });
 */
export function usePutBulkQuery<
  TVariables extends { id: string | number },
  TData
>(
  queryKey: readonly unknown[],
  endpoint: (id: TVariables["id"]) => string,
  notifier?: NotifyFn<ApiResponse<TData>>,
  options?: UseMutationOptions<ApiResponse<TData>, unknown, TVariables>
) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<TData>, unknown, TVariables>({
    mutationFn: ({ id, ...body }) =>
      api.put<ApiResponse<TData>, Omit<TVariables, "id">>(endpoint(id), body),

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
