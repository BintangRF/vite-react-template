import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook DELETE data
 *
 * Cocok untuk:
 * - hapus item dari table / list
 * - hapus berdasarkan id atau parameter lain
 *
 * endpoint berupa function agar fleksibel:
 * (id) => `/todos/${id}`
 *
 * Contoh:
 * const deleteTodo = useDeleteQuery<ApiResponse<void>, number>(
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
