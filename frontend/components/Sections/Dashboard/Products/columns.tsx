"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MinimalProduct } from "@/hooks/hooks/use-products";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<MinimalProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="has-[>svg]:px-0"
          onClick={() => column.toggleSorting(sortDirection === "asc")}
        >
          ID
          {sortDirection === "asc" && <ArrowUp />}
          {sortDirection === "desc" && <ArrowDown />}
          {!sortDirection && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="has-[>svg]:px-0"
          onClick={() => column.toggleSorting(sortDirection === "asc")}
        >
          Name
          {sortDirection === "asc" && <ArrowUp />}
          {sortDirection === "desc" && <ArrowDown />}
          {!sortDirection && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("visibility")}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stock")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const productId = row.getValue("id");

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="shadow-sm h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/products/edit/${productId}`}>Edit product</Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
