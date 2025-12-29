import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook PUT untuk update dari LIST / TABLE
 *
 * Ciri:
 * - payload WAJIB mengandung id
 * - endpoint berupa function (id) => string
 * - cocok untuk DataTable, modal edit, inline edit
 *
 * Contoh:
 * const updateTodo = usePutBulkQuery<
 *   { id: number; title: string },
 *   ApiResponse<Todo>
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
