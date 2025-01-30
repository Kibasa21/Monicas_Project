import { FoodShelfStructure } from "@/components/supplies/ShelfStructure";
import { ShelfTab } from "@/components/supplies/ShelfTab";
import { FallBackComponent } from "@/components/ui/fall-back-component";
import { Suspense, type JSX } from "react";

export default async function FoodSuppliesPage(): Promise<JSX.Element> {
  const food_elements: any[] = FoodShelfStructure.data.categories.map(
    (element) => {
      let food_elements = [];
      food_elements.push(element);
      return food_elements;
    }
  );

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
