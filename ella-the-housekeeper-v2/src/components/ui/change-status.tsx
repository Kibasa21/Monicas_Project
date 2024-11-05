import React, { useEffect, useState } from "react";
import { ShortList } from "../todo/TodoList";
import { Row } from "@tanstack/react-table";

export default function ChangeStatus({
  time,
  setTime,
  row,
}: {
  time: Date;
  setTime: Date;
  row: Row<ShortList>;
}) {
  const timeout = Math.round(
    (new Date(time).getTime() - setTime.getTime()) / (1000 * 60)
  );

  //const [changed, setChanged] = useState<boolean>(false)

  if (timeout > 0) {
    useEffect(() => {
      const timer = setTimeout(() => {
        row.original.status = "Pending";
        //setChanged(true);
      }, timeout * (1000 * 60));

      return () => {
        clearTimeout(timer);
      };
    }, [timeout, row]);
  } else {
    //setChanged(true);
    row.original.status = "Pending";
  }

  return <div className="capitalize">{row.original.status}</div>;
}
