"use client";

import type React from 'react';
import { useForm, type UseFormReturn } from "react-hook-form";
import { Button } from "./button";
import FormInput from "./FormItems/form-input";
import FormTextArea from "./FormItems/form-textarea";
import FormDate from "./FormItems/form-date";
import type { z } from "zod";
import type { Table } from "@tanstack/react-table";
import type { ShortList } from "../todo/TodoList";

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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  table: Table<ShortList>;
}): JSX.Element {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}

FormatedForm.input = FormInput;
FormatedForm.textarea = FormTextArea;
FormatedForm.date = FormDate;
