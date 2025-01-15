import { JSDOM } from "jsdom";

const dataRetrieval = async (): Promise<{
  status: string;
  products: string[];
}> => {
  try {
    const response = await fetch(
      "http://www.nfce.se.gov.br/portal/qrcode.jsp?p=28250139346861011600651250002540601125399529|2|1|1|FB45C4BD0A67CBA1FCDCEAAE0E1892DF164F673A"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    //const document = dom.window.document;
    //const products = Array.from(document.querySelectorAll("tbody"));

    /*
    const productContents = products.map(
      (product) => product.textContent?.trim() || ""
    );
    */

    console.log(html);

    return { status: "Successful", products: html };
  } catch (error) {
    console.error("Failed to fetch and parse data:", error);
    return { status: "Failed", products: [] };
  }
};

export default dataRetrieval;
