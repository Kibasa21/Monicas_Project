'use client';

import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "./button";
import FormInput from "./FormItems/form-input";
import FormTextArea from "./FormItems/form-textarea";
import FormDate from "./FormItems/form-date";
import { DialogFooter } from "./dialog";
import { z } from "zod"
import { deleteRow, insertRow, supabase, updateRow } from "@/api/";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { ShortList } from "../todo/TodoList";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default function FormatedForm({ children, className = "space-y-8", form, Submit = "Submit", FormSchema, setOpen, table }: {
    children: JSX.Element | JSX.Element[],
    className?: string,
    form: UseFormReturn<any, any, undefined>,
    Submit?: string,
    FormSchema: z.ZodObject<any, any>,
    setOpen: (value: React.SetStateAction<boolean>) => void,
    table: Table<ShortList>
}): JSX.Element {

    const [pending, setPending] = useState(false)

    const router = useRouter();
    const queryClient = new QueryClient()

    type FormSchemaType = z.infer<typeof FormSchema>

    async function onSubmit(data: FormSchemaType) {
        setPending(true);
        let finished_data: Object;
        data.deadline > new Date() ?
            finished_data = { ...data, status: "In Progress" }
            :
            finished_data = { ...data, status: "Pending" };
        const {data: input, error} = await insertRow("TodoList", finished_data, supabase);
        const updatePromises = table.getRowModel().rows.map(async (row) => {
            if (row.original.status !== row.getValue('status')) {
              return updateRow("TodoList", "id", row.original.id, { status: row.original.status }, supabase);
            }
            if (new Date().getTime() - row.original.deadline.getTime() > (1000 * 60 * 60 * 24 * 30)) {
              return deleteRow("TodoList", "id", row.original.id, supabase);
            }
            return Promise.resolve();
          });
          await Promise.all(updatePromises);
        console.log(input,error);
        form.reset();

        queryClient.invalidateQueries('app')
        

        setOpen(false);
        setPending(false);
        router.refresh();
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
            {children}
            <DialogFooter>
                <Button type="submit">{!pending ? Submit : "Loading..."}</Button>
            </DialogFooter>
        </form>
    )
}

FormatedForm.input = FormInput;
FormatedForm.textarea = FormTextArea;
FormatedForm.date = FormDate;