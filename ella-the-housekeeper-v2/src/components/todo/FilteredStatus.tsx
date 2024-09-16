import { ColumnDef, flexRender, Table as TableTodo } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { ShortList } from "./TodoList";
import React from "react";
import { useFilterStore } from "@/store/filter-status-context";

export default function FilteredStatus({ table, columns }: {
  table: TableTodo<ShortList>,
  columns: ColumnDef<ShortList>[]
}): JSX.Element {

  let isEmpty = true;

  const { status: filter} = useFilterStore();

  console.log(filter);

  return (
    <Table>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => {
                if (filter === cell.row.original.status || filter === 'All') {
                  isEmpty = false;
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                } else {
                  return;
                }
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
        {isEmpty &&
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  );
}