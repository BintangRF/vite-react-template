import type { ApiResponse } from "@/types/api-response.types";
import type { NotifyFn } from "@/types/notify.types";
import Swal from "sweetalert2";

/**
 * notifier berbasis SweetAlert
 * Digunakan untuk menampilkan feedback success / error
 * Bisa dipakai ulang di semua mutation hook
 *
 * Cara pakai:
 * usePostQuery(..., swalNotifier)
 */

function getMessage(res: any, fallback: string) {
  return res?.message || res?.data?.message || fallback;
}

export const swalNotifier: NotifyFn<ApiResponse<any>> = {
  success: (res) =>
    Swal.fire("Success", getMessage(res, "Berhasil"), "success"),

  error: () => Swal.fire("Error", "Gagal memproses data", "error"),
};
