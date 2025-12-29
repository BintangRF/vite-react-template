import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook GET DETAIL data dengan endpoint dynamic
 *
 * - queryKey: key cache unik
 * - endpoint: string endpoint dengan placeholder, misal "/todos/:id"
 * - paramsForEndpoint: object untuk mengganti placeholder (:id, :userId, dsb)
 * - params: optional query params tambahan (search, filter, expand)
 *
 * Otomatis:
 * - mengganti semua placeholder :key di endpoint dengan value di paramsForEndpoint
 * - cache berdasarkan queryKey + params
 *
 * Contoh penggunaan:
 *
 * Hardcoded ID
 * const { data, isLoading } = useGetDetailQuery<Todo>(
 *   "todo-5",
 *   "/todos/:id",
 *   { id: 5 }
 * );
 *
 * ID dari props
 * function TodoDetail({ todoId }: { todoId: number }) {
 *   const { data, isLoading } = useGetDetailQuery<Todo>(
 *     `todo-${todoId}`,
 *     "/todos/:id",
 *     { id: todoId }
 *   );
 *   ...
 * }
 *
 * ID dari URL params (React Router v6)
 * import { useParams } from "react-router-dom";
 * function TodoDetailPage() {
 *   const { id } = useParams<{ id: string }>();
 *   const { data, isLoading } = useGetDetailQuery<Todo>(
 *     `todo-${id}`,
 *     "/todos/:id",
 *     { id }
 *   );
 *   ...
 * }
 *
 * Lebih dari satu placeholder
 * const { data } = useGetDetailQuery<Post>(
 *   "user-post-42-7",
 *   "/users/:userId/posts/:postId",
 *   { userId: 42, postId: 7 }
 * );
 */
export function useGetDetailQuery<T>(
  queryKey: string,
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
    queryKey: [queryKey, params ?? {}],
    queryFn: () => api.get<T>(finalEndpoint, params),
    placeholderData: (previousData) => previousData,
  });
}
