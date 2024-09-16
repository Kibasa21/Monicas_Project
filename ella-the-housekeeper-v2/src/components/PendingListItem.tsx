import { selectRow, supabase } from "@/api/";
import ListItem from "./ListItem";

export const PendingListItem = () => {
  return <></>
  /*
  const components_pending: any[] = await selectRow("TodoList", "status", "Pending", supabase);
  const components_inProgress: any[] = await selectRow("TodoList", "status", "In Progress", supabase);
  const components: any[] = [...components_pending, ...components_inProgress];

  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
      {components.map((component) => (
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
  )
    */
}