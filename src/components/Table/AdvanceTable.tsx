import { getPaginationRange } from "@/utils/getPaginationRange";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import React, { useState } from "react";

interface AdvanceTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  isError?: boolean;
  error?: { message: string };
}

export default function AdvanceTable<TData>({
  data,
  columns,
  isLoading,
  isError,
  error,
}: AdvanceTableProps<TData>): React.ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,

    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 80,
      size: 150,
      maxSize: 600,
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4 text-sm text-gray-500">
        Loading table data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border p-4 text-sm text-red-600">
        {error?.message ?? "Failed to fetch data"}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-lg border p-4 text-sm text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full table-fixed text-sm">
        {/* ================= HEADER ================= */}
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="border-b px-3 py-2 align-top"
                >
                  <div className="flex flex-col gap-1 min-h-18">
                    {/* Sorting */}
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center gap-1 font-semibold text-gray-700 hover:text-gray-900"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: "▲",
                        desc: "▼",
                      }[header.column.getIsSorted() as string] ?? null}
                    </button>

                    {/* Filter (keep height consistent) */}
                    <div className="h-8">
                      {header.column.getCanFilter() && (
                        <input
                          value={
                            (header.column.getFilterValue() ?? "") as string
                          }
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          placeholder="Filter..."
                          className="h-8 w-full rounded border px-2 text-xs"
                        />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* ================= BODY ================= */}
        <tbody className="divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="h-12 hover:bg-gray-50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="px-3 py-2 align-middle"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
        <div className="text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>

          {getPaginationRange(
            table.getState().pagination.pageIndex,
            table.getPageCount()
          ).map((item, idx) =>
            item === "..." ? (
              <span key={`dots-${idx}`} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={`page-${item}`}
                onClick={() => table.setPageIndex(item)}
                className={`px-3 py-1 rounded border ${
                  table.getState().pagination.pageIndex === item
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item + 1}
              </button>
            )
          )}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
