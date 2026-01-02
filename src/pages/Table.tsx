import React from "react";
import SimpleTable from "@/components/Table/SimpleTable";
import { useGetQuery } from "@/hooks/useQuery/useGetQuery";
import { type ColumnDef } from "@tanstack/react-table";
import AdvanceTable from "@/components/Table/AdvanceTable";

type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Table(): React.ReactElement {
  // ===== Hardcode data =====
  const users: User[] = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Grace" },
  ];

  const userColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  // ===== API data =====
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetQuery<Post[]>(
    ["posts"],
    "https://jsonplaceholder.typicode.com/posts"
  );

  const postColumns: ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 80,
      enableColumnFilter: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 240,
    },
    {
      accessorKey: "body",
      header: "Body",
      size: 400,
    },
  ];

  return (
    <div className="p-6 space-y-10">
      {/* ===== Hardcode Table ===== */}
      <section>
        <h2 className="mb-2 text-base font-semibold text-gray-800">
          Hardcoded Users
        </h2>

        <SimpleTable data={users} columns={userColumns} />
      </section>

      {/* ===== API Table ===== */}
      <section>
        <h2 className="mb-2 text-base font-semibold text-gray-800">
          Posts from API
        </h2>

        <SimpleTable
          data={posts!}
          columns={postColumns}
          isLoading={isLoading}
          isError={isError}
          error={error!}
        />
      </section>

      {/* Advanced Table */}
      <section>
        <h2 className="mb-2 font-semibold">Advanced Table</h2>
        <AdvanceTable
          data={posts!}
          columns={postColumns}
          isLoading={isLoading}
          isError={isError}
          error={error!}
        />
      </section>
    </div>
  );
}
