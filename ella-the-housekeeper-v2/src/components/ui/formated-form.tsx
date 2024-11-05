"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "./button";
import FormInput from "./FormItems/form-input";
import FormTextArea from "./FormItems/form-textarea";
import FormDate from "./FormItems/form-date";
import { DialogFooter } from "./dialog";
import { z } from "zod";
import { deleteRow, insertRow, updateRow } from "@/api/";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { ShortList } from "../todo/TodoList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useTodoForms } from "@/hooks/use-todo-forms";
import { set } from "date-fns";

export default function FormatedForm({
  children,
  className = "space-y-8",
  form,
  Submit = "Submit",
  FormSchema,
  setOpen,
  table,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
  form: UseFormReturn<any, any, undefined>;
  Submit?: string;
  FormSchema: z.ZodObject<any, any>;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  table: Table<ShortList>;
}): JSX.Element {
  const [pending, setPending] = useState(false);

  type FormSchemaType = z.infer<typeof FormSchema>;

  function onSubmit(data: FormSchemaType) {
    let finished_data: Object;
    data.deadline > new Date()
      ? (finished_data = { ...data, status: "In Progress" })
      : (finished_data = { ...data, status: "Pending" });
    const { isLoading } = useTodoForms(finished_data);
    if (isLoading) {
      setPending(true);
    } else {
      form.reset();
      setPending(false);

      setOpen(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
      {children}
      <DialogFooter>
        <Button type="submit">{!pending ? Submit : "Loading..."}</Button>
      </DialogFooter>
    </form>
  );
}

FormatedForm.input = FormInput;
FormatedForm.textarea = FormTextArea;
FormatedForm.date = FormDate;
