import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
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
 * Parameter:
 * - queryKey: cache key yang akan di-invalidate setelah sukses
 * - endpoint: endpoint API lengkap (sudah termasuk id)
 *   contoh: `/todos/5`
 * - notifier: optional notifier untuk success / error
 * - options: opsi tambahan dari React Query
 *
 * Perilaku otomatis:
 * - menjalankan HTTP PUT ke endpoint yang sudah fix
 * - mengirim body tanpa id
 * - invalidate cache berdasarkan queryKey setelah sukses
 * - memanggil notifier.success dengan response backend
 *
 * Catatan penting:
 * - TResponse = response backend
 * - TBody = body request (payload update)
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
 * type UpdateTodoBody = {
 *   title: string;
 * };
 *
 * const updateTodo = usePutSingleQuery<
 *   ApiResponse<Todo>,     // response backend
 *   UpdateTodoBody         // body update (tanpa id)
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
export function usePutSingleQuery<TResponse = unknown, TBody = unknown>(
  queryKey: readonly unknown[],
  endpoint: string,
  notifier?: NotifyFn<TResponse>,
  options?: UseMutationOptions<TResponse, unknown, TBody>
) {
  const qc = useQueryClient();

  return useMutation<TResponse, unknown, TBody>({
    mutationFn: (body) => api.put<TResponse, TBody>(endpoint, body),

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
