"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Filter, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/hooks/use-debounce";
import { useShop } from "@/context/shopContext";
import { useWithdraws } from "@/hooks/hooks/use-withdraws";
import { WithdrawColumns } from "./withdrawColumns";

export default function WithdrawHistory() {
  const { selectedShop } = useShop();

  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize] = React.useState(10);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  const [search, setSearch] = React.useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useWithdraws(
    selectedShop?.id ?? 0,
    pageIndex + 1,
  );

  React.useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearch]);

  const table = useReactTable({
    data: data?.withdraws ?? [],
    columns: WithdrawColumns,
    pageCount: Math.ceil((data?.pages.totalCount ?? 0) / pageSize),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (!selectedShop) return null;

  return (
    <div className="pb-4 rounded border border-border shadow-sm bg-card w-full space-y-4">
      <div className="overflow-hidden border-b border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="h-13.5" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="font-semibold" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={WithdrawColumns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="mx-auto text-primary animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`h-13.5 ${
                    index % 2 === 0 ? "bg-muted/30" : "bg-transparent"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={WithdrawColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 px-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
            disabled={pageIndex <= 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageIndex((old) => Math.min(old + 1, table.getPageCount() - 1))
            }
            disabled={pageIndex >= table.getPageCount() - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
