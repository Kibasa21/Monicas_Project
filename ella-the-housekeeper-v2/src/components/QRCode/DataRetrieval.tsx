const jsdom = require("jsdom");

type Product = {
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
};

const ObjectCreator = (data: string[]): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < data.length; i += 4) {
    const product: Product = {
      name: data[i],
      quantity: parseFloat(data[i + 1].split(":")[1].trim()),
      unit: data[i + 2].split(":")[1].trim(),
      pricePerUnit: parseFloat(
        data[i + 3].split(":")[1].trim().replace(",", ".")
      ),
    };
    products.push(product);
  }
  return products;
};

const dataRetrieval = async (): Promise<Product[]> => {
  const response = await fetch(
    "http://www.nfce.se.gov.br/portal/qrcode.jsp?p=28250139346861011600651250002540601125399529|2|1|1|FB45C4BD0A67CBA1FCDCEAAE0E1892DF164F673A",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        Priority: "u=0, i",
      },
      method: "GET",
      mode: "cors",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const dom = new jsdom.JSDOM(html);
  const products = Array.from(
    dom.window.document.querySelectorAll(
      "span.txtTit, span.Rqtd, span.RUN, span.RvlUnit"
    )
  );
  const resultPrimitive: string[] = products.map(
    (product) => product.textContent?.trim() || ""
  );

  const result = ObjectCreator(resultPrimitive);

  console.log(result);

  return result;
};

export default dataRetrieval;
