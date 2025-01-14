import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/data-table";
import { format } from "date-fns/format";
import { differenceInMinutes, parseISO } from "date-fns";
import { PlayHistory } from "@/@types/play-history";

interface GameHistoryTableProps {
  data: PlayHistory[];
}

const GameHistoryTable = ({ data }: GameHistoryTableProps) => {
  const columns: ColumnDef<PlayHistory>[] = [
    {
      accessorKey: "",
      header: "No.",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Date",
      cell: ({ row }) =>
        format(parseISO(row.original.from_date), "dd/mm/yyyy hh:mm aa"),
    },
    {
      header: "Play Duration",
      cell: ({ row }) =>
        differenceInMinutes(
          new Date(parseISO(row.original.to_date)),
          new Date(parseISO(row.original.from_date))
        ),
    },
    {
      header: "Game",
      cell: ({ row }) => row.original.product,
    },
    {
      header: "Play Count",
      cell: ({ row }) => row.original.total_count,
    },
    {
      header: "Bet Amount",
      cell: ({ row }) => row.original.total_bet_amount,
    },
    {
      header: "Win/Loss Amount",
      cell: ({ row }) => row.original.total_transaction_amount,
    },
  ];
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default GameHistoryTable;
