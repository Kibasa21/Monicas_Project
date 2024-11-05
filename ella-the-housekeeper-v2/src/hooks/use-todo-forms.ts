import { insertRow } from "@/api";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { QueryClient, useQuery } from "@tanstack/react-query";

export function useTodoForms(finished_data: Object) {
  const client = useSupabaseBrowser();
  const queryKey = ["todos", "status"]; //this array is used as a key for the query, as columns can be changed and the query should be re-executed
  const queryClient = new QueryClient();

  const queryFn = async () => {
    const result = await insertRow(client, finished_data);
    await queryClient.invalidateQueries({ queryKey });
    return result.data;
  };

  return useQuery({
    queryKey,
    queryFn,
  });
}
