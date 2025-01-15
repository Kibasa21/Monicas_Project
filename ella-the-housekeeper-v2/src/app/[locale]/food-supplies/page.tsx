import getProducts from "../api/page";
import { ShelfTab } from "@/components/supplies/ShelfTab";
import { FallBackComponent } from "@/components/ui/fall-back-component";
import { Suspense, type JSX } from "react";

export default async function FoodSuppliesPage(): Promise<JSX.Element> {
  const response = await fetch(
    "https://www.samsclub.com.br/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=pt-BR&operationName=categories&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%225dc244e6c2ca11ba9742e6c0fcb1dc72504505119a9602f83f97a9769505d3cb%22%2C%22sender%22%3A%22samsclub.sams-theme%401.x%22%2C%22provider%22%3A%22vtex.store-graphql%402.x%22%7D%2C%22variables%22%3A%22eyJ0cmVlTGV2ZWwiOiIzIn0%3D%22%7D",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "Alt-Used": "www.samsclub.com.br",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=6",
      },
      referrer: "https://www.samsclub.com.br/",
      method: "GET",
      mode: "cors",
    }
  );
  const results = await response.json();
  const food_elements_index: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 21];
  console.log(results.data.categories);
  const food_elements: any[] = food_elements_index.map((index) => {
    let food_elements = [];
    food_elements.push(results.data.categories[index]);
    //console.log(results.data.menus[index]);
    return food_elements;
  });

  return (
    <div>
      <Suspense fallback={<FallBackComponent />}>
        <ShelfTab
          shelfElements={food_elements as any}
          tabName={"Food Supplies"}
          tabDescription={"The shelf you attack in the middle of the night"}
        />
      </Suspense>
    </div>
  );
}
