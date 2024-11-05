"use client";

import * as React from "react";
import {
  flexRender,
  type Table,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { ArrowUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
//import { cookies } from 'next/headers'
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../../components/ui/input";
import RemainingTime from "../CurrentTime";
import { TodoForm } from "./TodoForm";
import SelectStatusFilter from "./SelectStatusFilter";
import ChangeStatus from "../ui/change-status";
import { TasksScroll } from "./TasksScroll";
import { FilterStoreProvider } from "@/store/filter-status-context";
import { TodoHeader } from "./TodoHeader";
import { useEffect } from "react";
import {
  Table as TableTodo,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import FilteredStatus from "./FilteredStatus";
import { useTodoQuery } from "@/hooks/use-todo-query";

export type ShortList = {
  id: string;
  deadline: Date;
  status: "In Progress" | "Success" | "Pending";
  title: string;
};

export const columns: ColumnDef<ShortList>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox
        defaultChecked={row.original.status === "Success"}
        //checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          switch (row.original.status) {
            case "In Progress":
              row.original.status = "Success";
              break;
            case "Success":
              row.original.status = "In Progress";
              break;
            case "Pending":
              break;
          }
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return row.original.status === "In Progress" ? (
        <ChangeStatus
          time={row.original.deadline}
          setTime={new Date()}
          row={row}
        />
      ) : (
        <div className="capitalize">{row.original.status}</div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-right">Task</div>,
    cell: ({ row }) => (
      <div className="lowercase text-left">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Time Left
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const time = row.getValue("deadline") as Date;

      return <RemainingTime time={time} setTime={new Date()} />;
    },
  },
];

export function TodoList({ className }: { className: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const supabase = useSupabaseBrowser();

  const { data, isLoading, isError, error } = useTodoQuery([
    "id",
    "deadline",
    "status",
    "title",
  ]);

  console.log({ data, isLoading });

  const table = useReactTable({
    data: data ?? [],
    columns: columns as any[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <FilterStoreProvider>
      <div className={cn("w-[500px]", className)}>
        <TodoHeader table={table} />
        <div className="rounded-md border">
          <TableTodo>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ??
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          </TableTodo>
          <ScrollArea className="h-[400px]">
            <FilteredStatus rows={table.getRowModel().rows} columns={columns} />
          </ScrollArea>
        </div>
      </div>
    </FilterStoreProvider>
  );
}
