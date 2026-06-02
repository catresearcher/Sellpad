"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { MinimalProduct } from "@/types/user.type";
import Link from "next/link";
import { useShop } from "@/context/shopContext";
import { toast } from "react-toastify";
import { QueryObserverResult, useQueryClient } from "@tanstack/react-query";
import { useDeleteProduct, useProducts } from "@/hooks/hooks/use-products";
import React from "react";
import { Shop } from "@/types/shop.type";

type ProductColumnsProps = {
  selectedShop: Shop | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteProduct: (args: any) => void;
};

export function getProductColumns({
  selectedShop,
  open,
  setOpen,
  deleteProduct,
}: ProductColumnsProps): ColumnDef<MinimalProduct>[] {
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
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
          <Dialog open={open} onOpenChange={setOpen}>
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
                    <Link
                      href={`/dashboard/${selectedShop?.id}/products/edit/${productId}`}
                    >
                      Edit product
                    </Link>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete product</Button>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DialogContent className="sm:max-w-105 p-0 overflow-hidden">
              <div className="p-4.5">
                <DialogHeader className="flex flex-col gap-4 items-center text-center">
                  <div className="flex items-center justify-center">
                    <div className="size-16 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                      <span className="icon-[solar--trash-bin-trash-bold] text-destructive size-8" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <DialogTitle className="text-xl font-semibold text-foreground">
                      Delete product
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-relaxed">
                      This action cannot be undone. The product will be
                      permanently removed from your store.
                    </DialogDescription>
                  </div>
                </DialogHeader>
              </div>

              <div className="border-t bg-muted/30 px-2 py-2 flex items-center gap-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 cursor-pointer h-10 w-full"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="button"
                  variant="destructive"
                  className="flex-1 h-10 w-full cursor-pointer"
                  onClick={() => {
                    deleteProduct({
                      shopId: selectedShop?.id,
                      productId,
                    });
                    setOpen(false);
                  }}
                >
                  <span className="icon-[solar--trash-bin-trash-bold] size-4" />
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
}
