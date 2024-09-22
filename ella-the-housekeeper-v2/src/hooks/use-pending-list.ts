import { getRowByStatus } from "@/api";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { useQuery } from "@tanstack/react-query";

export function usePendingList(status: string) {
    const client = useSupabaseBrowser();
    const queryKey = ['todos','status'];//this array is used as a key for the query, as columns can be changed and the query should be re-executed

    const queryFn = async () => {
        const result = await getRowByStatus(client,status);
        return result.data;
    };

    return useQuery({
        queryKey,
        queryFn
    });
}
