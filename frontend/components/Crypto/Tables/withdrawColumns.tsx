"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Withdraw } from "@/hooks/hooks/use-withdraws";

export const WithdrawColumns: ColumnDef<Withdraw>[] = [
  {
    accessorKey: "status",
    header: () => <div className="px-2">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="flex items-center gap-1 px-2">
          <span
            className={`icon-[material-symbols--arrow-circle-up] size-4 ${
              status === "Completed"
                ? "bg-emerald-500"
                : status === "Failed" && "bg-rose-600"
            }`}
          ></span>
          <h1 className="font-semibold">{status}</h1>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <span
            className={` size-4 ${row.original.method === "Bitcoin" ? "icon-[cryptocurrency-color--btc]" : row.original.method === "Litecoin" ? "icon-[cryptocurrency-color--ltc]" : row.original.method === "Ethereum" ? "icon-[cryptocurrency-color--eth]" : row.original.method === "Solana" && "icon-[token-branded--solana]"}`}
          ></span>
          <p className="font-medium">
            {row.original.usdValue.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
    cell: ({ row }) => {
      const recipient = row.original.recipient;

      return (
        <span className="max-w-55 truncate block text-muted-foreground">
          {recipient}
        </span>
      );
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.original.transactionId;

      return <span className="text-muted-foreground">{transactionId}</span>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right px-2">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.date);

      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return (
        <div className="flex justify-end gap-2 items-center leading-tight text-right px-2">
          <span className="text-muted-foreground">{formattedDate}</span>

          <span className="font-semibold text-foreground">{formattedTime}</span>
        </div>
      );
    },
  },
];
