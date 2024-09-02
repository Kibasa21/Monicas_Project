"use client"

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronLeftIcon, ChevronRightIcon, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RemainingTime from "../CurrentTime";
import { TodoForm } from "./TodoForm";
import { ScrollArea } from "../ui/scroll-area";
import { supabase, updateRow } from "@/app/api/supabaseQuery";
import SelectStatusFilter from "./SelectStatusFilter";
import FilteredStatus from "./FilteredStatus";

export type ShortList = {
  id: string;
  deadline: Date;
  status: "In Progress" | "Success" | "Pending";
  title: string;
};

function changeStatus(row: Row<ShortList>): string {

  if (row.original.deadline.getTime() > new Date().getTime() || row.original.status === 'Success' || row.original.status === 'Pending') {
    return row.original.status;
  } else {
    row.original.status = 'Pending';
    return row.original.status;
  }
}

export const columns: ColumnDef<ShortList>[] = [
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
        defaultChecked={row.getValue('status') === 'Success'}
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
    cell: ({ row }) => (
      <div className="capitalize">{changeStatus(row)}</div>
    ),
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

export function TodoList({ className, list }: { className: string, list: ShortList[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filter, setFilter] = React.useState<string>('In Progress');

  const table = useReactTable({
    data: list,
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

  const handleBeforeUnload = async () => {

    const updatePromises = table.getRowModel().rows.map(async (row) => {
      if (row.original.status !== row.getValue('status')) {
        return updateRow("TodoList", "id", row.original.id, { status: row.original.status }, supabase);
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
  };

  React.useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload,);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className={"w-[500px] " + className}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <TodoForm />
        <SelectStatusFilter content={
          ['In Progress', 'Success', 'Pending', 'All']
        }
        filter={setFilter}
        label="Status"
        placeholder="In Progress"
        />
      </div>
      <div className="rounded-md border">
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
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
        <ScrollArea className="h-[400px]">
          <FilteredStatus table={table} columns={columns} filter={filter} />
        </ScrollArea>
      </div>
      {/* <div className="flex-1 text-sm text-muted-foreground text-center py-1">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
    </div>
  );
}