import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook POST data (create)
 *
 * Cocok untuk:
 * - create data baru
 * - submit form
 *
 * invalidateQueries otomatis setelah sukses
 *
 * Contoh:
 * const createTodo = usePostQuery<ApiResponse<Todo>, CreateTodoPayload>(
 *   ["todos"],
 *   "/todos",
 *   swalNotifier
 * );
 *
 * createTodo.mutate({ title: "Belajar TS" });
 */
export function usePostQuery<
  TResponse extends { message?: string } = any,
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
