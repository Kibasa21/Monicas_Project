import { getRowById } from "@/api";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { useQuery } from "@tanstack/react-query";

export function useDescriptionCard(id: number) {
  const client = useSupabaseBrowser();
  const queryKey = ["status"]; //this array is used as a key for the query, as columns can be changed and the query should be re-executed

  const queryFn = async () => {
    const result = await getRowById(client, id);
    return result.data;
  };

  return useQuery({
    queryKey,
    queryFn,
  });
}
