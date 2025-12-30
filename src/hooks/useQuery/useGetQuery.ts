import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook GET data (LIST atau DETAIL sederhana)
 *
 * Digunakan untuk:
 * - mengambil data list
 * - mengambil detail tanpa path param dinamis
 *
 * Parameter:
 * - queryKey: cache key utama (WAJIB array agar konsisten & aman)
 * - endpoint: endpoint API (contoh "/todos")
 * - params: optional query params (search, filter, pagination, sorting)
 *
 * Perilaku otomatis:
 * - cache akan berbeda jika params berbeda
 * - mempertahankan data lama saat params berubah (UX lebih halus)
 *
 * Catatan penting:
 * - T adalah tipe data yang DIKEMBALIKAN oleh api.get
 * - jika backend membungkus response:
 *   { data: T; message?: string }
 *   maka gunakan: useGetQuery<ApiResponse<T>>
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
 * // Ambil list todos
 * const { data, isLoading } = useGetQuery<ApiResponse<Todo[]>>(
 *   ["todos"],
 *   "/todos",
 *   { page: 1, limit: 10 }
 * );
 *
 * // Ambil detail sederhana (tanpa path param)
 * const { data } = useGetQuery<ApiResponse<Todo>>(
 *   ["todo", 5],
 *   "/todos/5"
 * );
 */
export function useGetQuery<T>(
  queryKey: readonly unknown[],
  endpoint: string,
  params?: Record<string, any>
) {
  return useQuery<T>({
    queryKey: [...queryKey, params ?? {}],
    queryFn: () => api.get<T>(endpoint, params),
    placeholderData: (previousData) => previousData,
  });
}
