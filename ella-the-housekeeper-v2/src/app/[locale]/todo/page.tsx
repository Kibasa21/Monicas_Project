import { ShortList, TodoList } from "@/components/todo/TodoList";
import { selectColumns, supabase } from "@/api/";
import React from "react";

async function selectList() {
  /*
  const list = await selectColumns("TodoList", ["id", "deadline", "status", "title"], supabase);

  const ShortList: ShortList[] = list.map((item) => {
      return {
          id: item.id,
          deadline: new Date(item.deadline),
          status: item.status,
          title: item.title
      }
  })

  return ShortList;
  */
}

export default async function TodoPage (): Promise<JSX.Element> {
  return (
    <div className="relative w-full">
      <TodoList className="absolute left-20 top-6 pb-14" />
    </div>
  )
}