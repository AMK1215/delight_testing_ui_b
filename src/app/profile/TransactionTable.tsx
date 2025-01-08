import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/data-table";
import { Histories } from "./data";
import { PagingData } from "./StaticTypes";
import { useState } from "react";
import { History } from "@/@types/history";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

const TransactionTable = () => {
  const [pagingData, setPagingData] = useState<PagingData>({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  });
  const columns: ColumnDef<History>[] = [
    {
      accessorKey: "",
      header: "No.",
      cell: ({ row }) => row.index,
    },
    {
      header: "Account Name",
      cell: ({ row }) => row.original.account_name,
    },
    {
      header: "Account Number",
      cell: ({ row }) => row.original.account_number,
    },
    {
      header: "Provider",
      cell: ({ row }) => row.original.provider,
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={clsx({
            "text-yellow-500 border border-yellow-500":
              row.original.status === "pending",
            "text-red-500 border border-red-500":
              row.original.status === "reject",
            "text-active border border-active":
              row.original.status === "approve",
          })}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      header: "Amount",
      cell: ({ row }) => (
        <span
          className={clsx("font-bold", {
            "text-yellow": row.original.type === "withdraw",
            "text-active": row.original.type === "deposit",
          })}
        >{`${row.original.type === "deposit" ? "+" : "-"} ${
          row.original.amount
        }`}</span>
      ),
    },
  ];
  return (
    <div>
      <DataTable data={Histories} columns={columns} />
    </div>
  );
};

export default TransactionTable;
