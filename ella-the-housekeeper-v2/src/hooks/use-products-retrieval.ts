import { QueryClient, useQuery } from "@tanstack/react-query";
import { HTMLToJSON } from 'html-to-json-parser'

export function useProductsRetrieval() {
  const queryKey = ["qrcode", "shelf"]; // this array is used as a key for the query, as columns can be changed and the query should be re-executed
  //const queryClient = new QueryClient();


  const result = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(
        "http://www.nfce.se.gov.br/portal/qrcode.jsp?p=28250139346861011600651250002540601125399529|2|1|1|FB45C4BD0A67CBA1FCDCEAAE0E1892DF164F673A"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const html = await response.text();
      console.log(html);

      const result = await HTMLToJSON(html, true); 
      console.log(result);

      //const products = Array.from(document.querySelectorAll("tbody"));
  
      /*
      const productContents = products.map(
        (product) => product.textContent?.trim() || ""
      );
      */
  
      //await queryClient.invalidateQueries({ queryKey });
      return result;
    }
  })

  return result
}
