"use client"

import * as React from "react";
import {
    Table,
} from "@tanstack/react-table";
import { Input } from "../../components/ui/input";
import { TodoForm } from "./TodoForm";
import SelectStatusFilter from "./SelectStatusFilter";
import { ShortList } from "./TodoList";
import { useFilterStore } from "@/store/filter-status-context";

export function TodoHeader({ table }: { table: Table<ShortList> }) {

    const { setStatus } = useFilterStore();

    return (
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
                filter={setStatus}
                label="Status"
                placeholder="In Progress"
            />
        </div>
    );
}