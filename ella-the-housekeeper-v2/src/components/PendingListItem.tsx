'use client'

import { Suspense } from "react";
import ListItem from "./ListItem";
import { usePendingList } from "@/hooks/use-pending-list";
import { FallBackComponent } from "./ui/fall-back-component";

type Row = {
  created_at: string;
  deadline: string;
  description: string;
  id: number;
  status: string;
  title: string;
};

export const PendingListItem = () => {

  const { data: components, isLoading, isError, error } = usePendingList("Pending");

  console.log('PendingListItem', components, isLoading, isError, error);

  return (
    <Suspense fallback={<FallBackComponent />}>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {(components as Row[]).map((component) => (
          <ListItem
            key={component.title}
            title={component.title}
            href=""//{component.href}
            className=""
          >
            {component.description}
          </ListItem>
        ))}
      </ul>
    </Suspense >
  )
}