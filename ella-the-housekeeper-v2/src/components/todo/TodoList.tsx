"use client"

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../../components/ui/input";
import RemainingTime from "../CurrentTime";
import { TodoForm } from "./TodoForm";
import { deleteRow, supabase, updateRow } from "@/app/api/supabaseQuery";
import SelectStatusFilter from "./SelectStatusFilter";
import ChangeStatus from "../ui/change-status";
import { TasksScroll } from "./TasksScroll";
import { FilterStoreProvider } from "@/store/filter-status-context";
import { TodoHeader } from "./TodoHeader";

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
        defaultChecked={row.original.status === 'Success'}
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
      return (
        row.original.status === 'In Progress' ?
          <ChangeStatus time={row.original.deadline} setTime={new Date()} row={row} />
          :
          <div className="capitalize">{row.original.status}</div>
      )
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-right">Task</div>,
    cell: ({ row }) => <div className="lowercase text-left">{row.getValue("title")}</div>,
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

export function TodoList({ className, initialList }: { className: string, initialList: ShortList[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const usefulList: ShortList[] = [...initialList.map((item) => ({ ...item }))];

  const table = useReactTable({
    data: usefulList,
    columns,
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

  console.log(initialList);
  console.log(usefulList);
  console.log('aaaaaaaaaaaaaaaaaaa');
  return (
    <FilterStoreProvider>
      <div className={"w-[500px] " + className}>
        <TodoHeader table={table} />
        <TasksScroll initialList={initialList} table={table} columns={columns} />
      </div>
    </FilterStoreProvider>
  );
}