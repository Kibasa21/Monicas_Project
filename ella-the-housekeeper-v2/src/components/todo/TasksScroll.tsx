"use client"

import * as React from "react";
import { useEffect, type JSX } from "react";
import {
  type ColumnDef,
  flexRender,
  type Table
} from "@tanstack/react-table";
import {
  Table as TableTodo,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { deleteRow, updateRow } from "@/api";
import { useSupabaseBrowser }  from '@/utils/supabase-browser'
import FilteredStatus from "./FilteredStatus";
import { ShortList } from "./TodoList";

  // Função para atualizar os dados
  const updateData = async (initialList: ShortList[], usefulList: ShortList[]) => {
    const updatePromises = usefulList.map(async (row, index) => {
      console.log(initialList[index]);
      if(initialList[index]===undefined) {
        console.log('undefined')
        return await updateRow("TodoList", "id", row.id, { status: row.status }, supabase);
      }
      if (row.status !== initialList[index].status) {
        console.log('passou')
        return await updateRow("TodoList", "id", row.id, { status: row.status }, supabase);
      }
      if (new Date().getTime() - row.deadline.getTime() > (1000 * 60 * 60 * 24 * 30)) {
        return await deleteRow("TodoList", "id", row.id, supabase);
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
  };

export function TasksScroll({ table, columns }: { 
  initialList: ShortList[],
  table: Table<ShortList>,
  columns: ColumnDef<ShortList>[]
 }): JSX.Element {

  const [reload, setReload] = React.useState<number>(0);

  const supabase = useSupabaseBrowser()

  return (
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
        <FilteredStatus table={table} columns={columns} />
      </ScrollArea>
    </div>
  );
}