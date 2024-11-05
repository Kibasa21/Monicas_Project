import { ShortList, TodoList } from "@/components/todo/TodoList";
import React from "react";
import { DescriptionCard } from "@/components/todo/DescriptionCard";
import { DescriptionStoreProvider } from "@/store/description-context";

export default async function TodoPage(): Promise<JSX.Element> {
  return (
    <DescriptionStoreProvider>
      <div className="relative w-full">
        <TodoList className="absolute left-20 top-6 pb-14" />
        <DescriptionCard className="absolute right-20 top-10" />
      </div>
    </DescriptionStoreProvider>
  );
}
