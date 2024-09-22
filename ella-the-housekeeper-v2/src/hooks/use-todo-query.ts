import { getColumns } from "@/api";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { useQuery } from "@tanstack/react-query";

export function useTodoQuery(columns: string[]) {
    const client = useSupabaseBrowser();
    const queryKey = ['todos', columns];//this array is used as a key for the query, as columns can be changed and the query should be re-executed

    const queryFn = async () => {
        const result = await getColumns(client, columns);
        return result.data;
    };

    return useQuery({
        queryKey,
        queryFn
    });
}
