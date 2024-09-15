"use client"

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  Table,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../../components/ui/input";
import {
  Table as TableTodo,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RemainingTime from "../CurrentTime";
import { TodoForm } from "./TodoForm";
import { ScrollArea } from "../ui/scroll-area";
import { deleteRow, supabase, updateRow } from "@/app/api/supabaseQuery";
import SelectStatusFilter from "./SelectStatusFilter";
import FilteredStatus from "./FilteredStatus";
import ChangeStatus from "../ui/change-status";

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
      console.log(row.original.status, row.original.title);
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

  // Função para atualizar os dados
  const updateData = async (initialList: ShortList[], table: Table<ShortList>) => {
    console.log(initialList[6])
    const updatePromises = table.getRowModel().rows.map(async (row, index) => {
      console.log(initialList[index]);
      if(initialList[index]===undefined) {
        console.log('undefined')
        return await updateRow("TodoList", "id", row.original.id, { status: row.original.status }, supabase);
      }
      if (row.original.status !== initialList[index].status) {
        console.log('passou')
        return await updateRow("TodoList", "id", row.original.id, { status: row.original.status }, supabase);
      }
      if (new Date().getTime() - row.original.deadline.getTime() > (1000 * 60 * 60 * 24 * 30)) {
        return await deleteRow("TodoList", "id", row.original.id, supabase);
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
  };

export function TodoList({ className, initialList }: { className: string, initialList: ShortList[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filter, setFilter] = React.useState<string>('In Progress');
  const [reload, setReload] = React.useState<number>(0);

  const usefulList = [...initialList];
  
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
  console.log(rowSelection)

  // Efeito para salvar dados periodicamente
  React.useEffect(() => {
    const saveInterval = setInterval(async() => {
      await updateData(initialList, table);
      console.log(reload);
      setReload((prevReload: number) => prevReload + 1);
    }, 1*1000*60); // Salva a cada 60 segundos

    return () => clearInterval(saveInterval);
  }, [table]);

  // Efeito para tentar salvar dados antes de descarregar a página
  React.useEffect(() => {
    const handleUnload = async () => {
      // Nota: Isso pode não funcionar em todos os navegadores para operações assíncronas
      await updateData(initialList, table);
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
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
        <TodoForm table={table} />
        <SelectStatusFilter content={
          ['In Progress', 'Success', 'Pending', 'All']
        }
          filter={setFilter}
          label="Status"
          placeholder="In Progress"
        />
      </div>
      <div className="rounded-md border">
        <TableTodo>
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
        </TableTodo>
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