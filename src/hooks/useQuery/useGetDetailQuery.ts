import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api-response.types";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook GET DETAIL data dengan endpoint dinamis (path params + query params)
 *
 * Digunakan untuk:
 * - mengambil detail satu data (by id atau kombinasi parameter)
 * - endpoint REST dengan placeholder (:id, :userId, dll)
 *
 * Parameter:
 * - queryKey: cache key unik (disarankan array, bukan string)
 * - endpoint: endpoint dengan placeholder, contoh "/todos/:id"
 * - paramsForEndpoint: object untuk mengganti placeholder di endpoint
 *   contoh: { id: 5 } → "/todos/5"
 * - params: optional query params (search, filter, expand, include, dsb)
 *
 * Perilaku otomatis:
 * - mengganti semua placeholder :key di endpoint dengan value dari paramsForEndpoint
 * - encode value agar aman di URL
 * - cache akan berbeda jika query params berbeda
 *
 * Catatan:
 * - T adalah tipe data yang DIKEMBALIKAN oleh api.get
 * - jika backend membungkus response:
 *   { data: T; message?: string }
 *   maka gunakan: useGetDetailQuery<T>
 *
 * Contoh penggunaan:
 *
 *
 * type Todo = {
 *   id: number;
 *   title: string;
 *   completed: boolean;
 * };
 *
 * // Hardcoded ID
 * const { data, isLoading } = useGetDetailQuery<Todo>(
 *   ["todo", 5],
 *   "/todos/:id",
 *   { id: 5 }
 * );
 *
 * // ID dari props
 * function TodoDetail({ todoId }: { todoId: number }) {
 *   const { data } = useGetDetailQuery<Todo>(
 *     ["todo", todoId],
 *     "/todos/:id",
 *     { id: todoId }
 *   );
 * }
 *
 * // Lebih dari satu placeholder
 * const { data } = useGetDetailQuery<Post>(
 *   ["user-post", 42, 7],
 *   "/users/:userId/posts/:postId",
 *   { userId: 42, postId: 7 }
 * );
 */
export function useGetDetailQuery<T>(
  queryKey: readonly unknown[],
  endpoint: string,
  paramsForEndpoint?: Record<string, string | number>,
  params?: Record<string, any>
) {
  const finalEndpoint = paramsForEndpoint
    ? Object.entries(paramsForEndpoint).reduce(
        (url, [key, value]) =>
          url.replace(`:${key}`, encodeURIComponent(String(value))),
        endpoint
      )
    : endpoint;

  return useQuery<T>({
    queryKey: [...queryKey, params ?? {}],
    queryFn: async () => {
      const res = await api.get<ApiResponse<T>>(finalEndpoint, params);

      if (res && typeof res === "object" && "data" in res) {
        return res.data;
      }

      return res;
    },
    placeholderData: (previousData) => previousData,
  });
}
