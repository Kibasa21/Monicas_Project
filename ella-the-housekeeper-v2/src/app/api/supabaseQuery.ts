import { ShortList } from "@/components/todo/TodoList";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { FormEventHandler } from "react";

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

export async function formatRow(
    title:FormEventHandler<HTMLButtonElement>,
    deadline:FormEventHandler<HTMLButtonElement> | undefined,
    description:FormEventHandler<HTMLButtonElement>
) : Promise<Record<string, any>> {
    const row = {
        title: title,
        description: description,
        deadline: deadline,
        status: "In Progress",
    };
    return row;
}

export async function selectColumns(
  table: string,
  columns: string[],
  supabase: SupabaseClient
) {
  const { data, error } = await supabase.from(table).select(columns.join(","));
  revalidatePath('/[locale]/todo', 'page');
  if (error) {
    throw new Error(error.message);
  }
  return data as unknown as ShortList[];
}

export async function selectRow(
  table: string,
  rowType: string,
  rowValue: string,
  supabase: SupabaseClient
) {
  const { data, error } = await supabase.from(table).select("*").eq(rowType, rowValue);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function selectAll(table: string, supabase: SupabaseClient) {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function insertRow(
  table: string,
  row: Record<string, any>,
  supabase: SupabaseClient
) {
  const { data, error } = await supabase.from(table).insert(row);
  if (error) {
    throw new Error(error.message);
  }
  return {data, error};
}

export async function updateRow(
  table: string,
  rowType: string,
  rowValue: string,
  row: Record<string, any>,
  supabase: SupabaseClient
) {
  const { data, error } = await supabase.from(table).update(row).eq(rowType, rowValue);
  if (error) {
    throw new Error(error.message);
  }
  return {data, error};
}