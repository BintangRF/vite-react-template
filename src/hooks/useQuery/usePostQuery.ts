import { api } from "@/lib/api";
import type { NotifyFn } from "@/types/notify.types";
import type { ApiResponse } from "@/types/api-response.types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Hook POST data (CREATE / SUBMIT FORM)
 *
 * Digunakan untuk:
 * - membuat data baru
 * - submit form ke backend
 *
 * Standar RESPONSE (DIKUNCI DI SINI):
 * ApiResponse<T> = { data: T; message?: string }
 *
 * Caller:
 * - TIDAK perlu menulis ApiResponse
 * - cukup fokus ke tipe data bisnis & payload
 *
 * Contoh 1: JSON payload (application/json)
 *
 * type Todo = {
 *   id: number;
 *   title: string;
 * };
 *
 * type CreateTodoPayload = {
 *   title: string;
 * };
 *
 * const createTodo = usePostQuery<
 *   Todo,
 *   CreateTodoPayload
 * >(
 *   ["todos"],
 *   "/todos",
 *   swalNotifier
 * );
 *
 * createTodo.mutate({
 *   title: "Belajar TypeScript"
 * });
 *
 * Contoh 2: FORM DATA (multipart/form-data)
 *
 * Gunakan utility `objectToFormData`
 * untuk mengubah object biasa menjadi FormData.
 *
 * Utility:
 * import { objectToFormData } from "@/utils/objectToFormData";
 *
 * type UploadResponse = {
 *   id: number;
 *   filename: string;
 *   url: string;
 * };
 *
 * type UploadFormValues = {
 *   title: string;
 *   file: File;
 *   attachments?: File[];
 * };
 *
 * const uploadFile = usePostQuery<
 *   UploadResponse,
 *   FormData
 * >(
 *   ["files"],
 *   "/upload",
 *   swalNotifier
 * );
 *
 * const payload = objectToFormData<UploadFormValues>({
 *   title: "Dokumen A",
 *   file: selectedFile,
 *   attachments: additionalFiles,
 * });
 *
 * uploadFile.mutate(payload);
 */
export function usePostQuery<TData, TVariables = unknown>(
  queryKey: readonly unknown[],
  endpoint: string,
  notifier?: NotifyFn<ApiResponse<TData>>,
  options?: UseMutationOptions<ApiResponse<TData>, unknown, TVariables>
) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<TData>, unknown, TVariables>({
    mutationFn: (payload) =>
      api.post<ApiResponse<TData>, TVariables>(endpoint, payload),

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
