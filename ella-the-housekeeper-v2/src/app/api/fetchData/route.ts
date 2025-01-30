import { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";
import { NextRequest, NextResponse } from "next/server";

export type Product = {
  name: string;
  code: number;
  quantity: number;
  unit: string;
  pricePerUnit: number;
};

const ObjectCreator = (data: string[]): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < data.length; i += 5) {
    const product: Product = {
      name: data[i],
      code: parseFloat(data[i + 1].split(":")[1].trim()),
      quantity: parseFloat(data[i + 2].split(":")[1].trim().replace(",", ".")),
      unit: data[i + 3].split(":")[1].trim(),
      pricePerUnit: parseFloat(
        data[i + 4].split(":")[1].trim().replace(",", ".")
      ),
    };
    products.push(product);
  }
  return products;
};

const dataRetrieval = async (receiptLink: string): Promise<Product[]> => {
  const response = await fetch(receiptLink, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Upgrade-Insecure-Requests": "1",
      Priority: "u=0, i",
    },
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const dom = new JSDOM(html);
  const products = Array.from(
    dom.window.document.querySelectorAll(
      "span.txtTit, span.RCod, span.Rqtd, span.RUN, span.RvlUnit"
    )
  );
  const resultPrimitive: string[] = products.map(
    (product) => product.textContent?.trim() || ""
  );

  return ObjectCreator(resultPrimitive);
};

// API Route Handler
export async function POST(req: NextRequest) {
  try {
    const { receiptLink } = await req.json();
    const products = await dataRetrieval(receiptLink);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
