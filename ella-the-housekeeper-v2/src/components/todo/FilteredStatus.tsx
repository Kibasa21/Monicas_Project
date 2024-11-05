import {
  ColumnDef,
  flexRender,
  Row,
  Table as TableTodo,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { ShortList } from "./TodoList";
import React from "react";
import { useFilterStore } from "@/store/filter-status-context";
import { useDescriptionStore } from "@/store/description-context";

export default function FilteredStatus({
  rows,
  columns,
}: {
  rows: Row<any>[];
  columns: ColumnDef<ShortList>[];
}): JSX.Element {
  const { status: filter } = useFilterStore();
  const { setShowDescription } = useDescriptionStore();
  console.log("FilteredStatus", filter);

  return (
    <Table>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => {
              if (filter === cell.row.original.status || filter === "All") {
                return (
                  <TableCell
                    key={cell.id}
                    onClick={() => setShowDescription(cell.row.original.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        ))}

        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={rows.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
