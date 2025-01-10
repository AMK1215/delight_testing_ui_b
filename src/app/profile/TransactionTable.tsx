import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/data-table";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { TransactionHistory } from "@/@types/transaction-history";
import { format } from "date-fns/format";

interface TransactionTableProps {
  data: TransactionHistory[];
  type: "deposit" | "withdraw";
}

const TransactionTable = ({ data, type }: TransactionTableProps) => {
  const columns: ColumnDef<TransactionHistory>[] = [
    {
      accessorKey: "",
      header: "No.",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Date",
      cell: ({ row }) => format(row.original.datetime,"dd/mm/yyyy hh:mm aa")
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
      cell: ({ row }) => row.original.payment_type,
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={clsx({
            "text-yellow-500 border border-yellow-500":
              row.original.status === "Pending",
            "text-red-500 border border-red-500":
              row.original.status === "Reject",
            "text-active border border-active":
              row.original.status === "Success",
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
            "text-yellow": type === "withdraw",
            "text-active": type === "deposit",
          })}
        >{`${type === "deposit" ? "+" : "-"} ${row.original.amount}`}</span>
      ),
    },
  ];
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default TransactionTable;
