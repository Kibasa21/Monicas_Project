"use client"

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  Table
} from "@tanstack/react-table";
import {
  Table as TableTodo,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { deleteRow, supabase, updateRow } from "@/app/api/supabaseQuery";
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

export function TasksScroll({ initialList, table, columns }: { 
  initialList: ShortList[],
  table: Table<ShortList>,
  columns: ColumnDef<ShortList>[]
 }): JSX.Element {

  const [reload, setReload] = React.useState<number>(0);

  const usefulList:ShortList[] = [...initialList.map((item) => ({ ...item }))];

  //console.log(initialList);
  //console.log(usefulList)
  // Efeito para salvar dados periodicamente
  React.useEffect(() => {
    const saveInterval = setInterval(async() => {
      await updateData(initialList, usefulList);
      setReload((prevReload: number) => prevReload + 1);
    }, 1*1000*60); // Salva a cada 60 segundos

    return () => clearInterval(saveInterval);
  }, [initialList, usefulList]);

  // Efeito para tentar salvar dados antes de descarregar a página
  React.useEffect(() => {
    const handleUnload = async () => {
      // Nota: Isso pode não funcionar em todos os navegadores para operações assíncronas
      await updateData(initialList, usefulList);
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

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