import { getFoodSupplies } from "@/api/gb_index";
import { useQuery } from "@tanstack/react-query";

export function useGBQuery() {
  const queryKey = ["foodSupplies"]; //this array is used as a key for the query, as columns can be changed and the query should be re-executed

  const queryFn = async () => {
    const foodTabs = await getFoodSupplies();
    return foodTabs;
  };

  return useQuery({
    queryKey,
    queryFn,
  });
}
