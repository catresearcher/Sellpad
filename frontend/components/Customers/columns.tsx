"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Customer } from "@/types/customer.type";

export function getCustomerColumns({
  selectedShop,
}: any): ColumnDef<Customer>[] | null {
  return [
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
      accessorKey: "email",
      header: ({ column }) => {
        const sortDirection = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            className="has-[>svg]:px-0"
            onClick={() => column.toggleSorting(sortDirection === "asc")}
          >
            Email
            {sortDirection === "asc" && <ArrowUp />}
            {sortDirection === "desc" && <ArrowDown />}
            {!sortDirection && <ArrowUpDown />}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);

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
          <div className="flex justify-start gap-2 leading-tight text-left">
            <span className="text-muted-foreground">{formattedDate}</span>

            <span className="font-semibold text-foreground">
              {formattedTime}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
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
          <div className="flex justify-start gap-2 leading-tight text-left">
            <span className="text-muted-foreground">{formattedDate}</span>

            <span className="font-semibold text-foreground">
              {formattedTime}
            </span>
          </div>
        );
      },
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
              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Customer Action</DropdownMenuLabel>
                  <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
