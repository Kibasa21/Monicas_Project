import { QueryClient, useQuery } from "@tanstack/react-query";
import { JSDOM } from "jsdom";

export function useProductsRetrieval() {
  const queryKey = ["qrcode", "shelf"]; //this array is used as a key for the query, as columns can be changed and the query should be re-executed
  const queryClient = new QueryClient();

  const queryFn = async () => {
    const response = await fetch(
      "http://www.nfce.se.gov.br/portal/qrcode.jsp?p=28250139346861011600651250002540601125399529|2|1|1|FB45C4BD0A67CBA1FCDCEAAE0E1892DF164F673A"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const products = Array.from(document.querySelectorAll("tbody"));

    const productContents = products.map(
      (product) => product.textContent?.trim() || ""
    );

    await queryClient.invalidateQueries({ queryKey });
    console.log(productContents);
    return productContents;
  };

  return useQuery({
    queryKey,
    queryFn,
  });
}
