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
import { getCustomerColumns } from "./columns";
import { useDebounce } from "@/hooks/hooks/use-debounce";
import { useShop } from "@/context/shopContext";
import { useCustomers } from "@/hooks/hooks/use-customers";

export function CustomersTable() {
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

  const { data, isLoading } = useCustomers(
    selectedShop?.id ?? 0,
    pageIndex,
    debouncedSearch,
  );

  React.useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearch]);

  const columns = getCustomerColumns({ selectedShop });

  if (!columns) return null;

  const table = useReactTable({
    data: data?.customers ?? [],
    columns,
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

  React.useEffect(() => {
    table.getColumn("email")?.setFilterValue(debouncedSearch);
  }, [debouncedSearch, table]);

  if (!selectedShop) return null;

  return (
    <div className="p-4 rounded shadow-sm bg-card w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-full relative max-w-sm">
          <Search className="size-5 absolute left-2 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-full"
          />
        </div>

        <div className="flex flex-row items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto gap-3">
                Filter <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="mx-auto text-primary animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                <TableCell colSpan={columns.length} className="h-64">
                  <div className="flex flex-col items-center justify-center gap-1 text-center h-full">
                    <span className="icon-[tabler--user-search] size-20 text-primary"></span>

                    <div className="flex flex-col gap-2">
                      <h1 className="text-3xl font-medium">No Customers</h1>
                      <p className="text-base text-muted-foreground">
                        You don't have any customers
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} rows selected (out of{" "}
          {data?.pages.totalCount} total)
        </div>
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
