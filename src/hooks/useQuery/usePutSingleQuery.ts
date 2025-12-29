import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
/**
 * Hook PUT untuk UPDATE SATU DATA (detail page)
 *
 * Ciri:
 * - id dikunci di endpoint
 * - payload TIDAK mengandung id
 * - cocok untuk form edit / halaman detail
 *
 * Contoh:
 * const updateTodo = usePutSingleQuery<
 *   ApiResponse<Todo>,
 *   { title: string }
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
