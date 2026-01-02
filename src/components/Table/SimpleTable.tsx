import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

interface SimpleTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  isError?: boolean;
  error?: { message: string };
}

export default function SimpleTable<TData>({
  data,
  columns,
  isLoading,
  isError,
  error,
}: SimpleTableProps<TData>): React.ReactElement {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4 text-sm text-gray-500">
        Loading table data...
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

  {
    isError && (
      <div className="text-sm text-red-600">
        {error instanceof Error ? error.message : "Failed to fetch data"}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-semibold text-gray-700 border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-gray-800">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
