import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook GET data (list / detail)
 *
 * - queryKey: key utama cache (string)
 * - endpoint: endpoint API
 * - params: optional query params (search, filter, pagination)
 *
 * Otomatis:
 * - cache berdasarkan queryKey + params
 * - mempertahankan data lama saat params berubah
 *
 * Contoh:
 * const { data, isLoading } = useGetQuery<Todo[]>(
 *   "todos",
 *   "/todos",
 *   { page: 1 }
 * );
 */
export function useGetQuery<T>(
  queryKey: string,
  endpoint: string,
  params?: Record<string, any>
) {
  return useQuery<T>({
    queryKey: [queryKey, params ?? {}],
    queryFn: () => api.get<T>(endpoint, params),
    placeholderData: (previousData) => previousData,
  });
}
