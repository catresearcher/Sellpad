"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/hooks/hooks/use-transactions";

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: () => <div className="px-2">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      const type = row.original.type;

      return (
        <div className="flex items-center gap-1 px-2">
          <span
            className={`${type === "WITHDRAW" ? "icon-[material-symbols--arrow-circle-up]" : "icon-[material-symbols--arrow-circle-down-rounded]"} size-4 ${
              status === "Completed"
                ? "bg-emerald-500"
                : status === "Failed" && "bg-rose-600"
            }`}
          ></span>
          <h1 className="font-semibold">
            {type
              ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
              : ""}
          </h1>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.customer;
      return (
        <div className="flex flex-col">
          <h1 className="text-sm font-medium">{user.username}</h1>
          <p className="text-xs text-muted-foreground">{user.role}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "crypto",
    header: "Amount",
    cell: ({ row }) => {
      const currency = row.original.currency;
      const amount = Number(row.original.cryptoAmount);
      return (
        <div className="flex items-center gap-1">
          <span
            className={` size-4 ${currency === "BITCOIN" ? "icon-[cryptocurrency-color--btc]" : currency === "LITECOIN" ? "icon-[cryptocurrency-color--ltc]" : currency === "ETHEREUM" && "icon-[cryptocurrency-color--eth]"}`}
          ></span>
          <p className="font-medium">{amount.toFixed(6)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Usd",
    cell: ({ row }) => {
      const currency = row.original.currency;
      const amount = Number(row.original.totalAmount);
      return (
        <div className="flex items-center gap-1">
          <span
            className={` size-4 text-emerald-500 icon-[solar--dollar-bold]`}
          ></span>
          <p className="font-medium">
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right px-2">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

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
