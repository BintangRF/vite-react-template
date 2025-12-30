import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook PUT untuk UPDATE data dari LIST / TABLE (bulk-style update)
 *
 * Digunakan untuk:
 * - update data dari DataTable
 * - modal edit
 * - inline edit (row-based)
 *
 * Karakteristik:
 * - payload WAJIB mengandung `id`
 * - `id` digunakan untuk membentuk endpoint
 * - body request otomatis mengecualikan `id`
 *
 * Parameter:
 * - queryKey: cache key yang akan di-invalidate setelah sukses
 * - endpoint: function pembentuk endpoint berbasis id
 *   contoh: (id) => `/todos/${id}`
 * - notifier: optional notifier untuk success / error
 * - options: opsi tambahan dari React Query
 *
 * Perilaku otomatis:
 * - memisahkan `id` dari payload
 * - menjalankan HTTP PUT ke endpoint berbasis id
 * - invalidate cache berdasarkan queryKey setelah sukses
 * - memanggil notifier.success dengan response backend
 *
 * Catatan penting:
 * - TVariables = payload update (WAJIB ada id)
 * - TResponse = response backend
 * - backend umumnya mengembalikan:
 *   { data: T; message?: string }
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
 * type UpdateTodoPayload = {
 *   id: number;
 *   title: string;
 * };
 *
 * const updateTodo = usePutBulkQuery<
 *   UpdateTodoPayload,     // payload update (harus ada id)
 *   ApiResponse<Todo>      // response backend
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
  TResponse = unknown
>(
  queryKey: readonly unknown[],
  endpoint: (id: TVariables["id"]) => string,
  notifier?: NotifyFn<TResponse>,
  options?: UseMutationOptions<TResponse, unknown, TVariables>
) {
  const qc = useQueryClient();

  return useMutation<TResponse, unknown, TVariables>({
    mutationFn: ({ id, ...body }) =>
      api.put<TResponse, Omit<TVariables, "id">>(endpoint(id), body),

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
