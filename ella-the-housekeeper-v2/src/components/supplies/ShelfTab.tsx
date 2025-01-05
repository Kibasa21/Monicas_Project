import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ShelfTabElement } from "./ShelfTabElement";
import { Separator } from "../ui/separator";

export function ShelfTab({
  shelfElements,
  tabName,
  tabDescription,
}: {
  shelfElements: any;
  tabName: string;
  tabDescription: string;
}): JSX.Element {
  //const { data: tabs, isLoading } = useGBQuery();

  type FullFoodTabType = {
    id: string;
    href: string;
    name: string;
    children: any[];
    __typename: string;
  };

  //console.log(foodElements);

  return (
    <div className="hidden md:block">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="music" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      {(shelfElements as FullFoodTabType[][]).map(
                        (tabArray) => {
                          return tabArray.map((tab) => (
                            <TabsTrigger key={tab.id} value={tab.id}>
                              {tab.name}
                            </TabsTrigger>
                          ));
                        }
                      )}
                    </TabsList>
                  </div>
                  {(shelfElements as FullFoodTabType[][]).map((tabArray) => {
                    return tabArray.map((tab) => (
                      <TabsContent
                        value={tab.id}
                        className="border-none p-0 outline-none"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              {tabName}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {tabDescription}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="relative">
                          <ScrollArea>
                            <div className="flex space-x-4 pb-4">
                              {tab.children.map((product) => (
                                <ShelfTabElement
                                  key={product.id}
                                  id={product.id}
                                  name={product.name}
                                  className="w-[150px]"
                                  aspectRatio="square"
                                />
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                        {/* <div className="mt-6 space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Made for You
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your personal playlists. Updated daily.
                          </p>
                        </div> */}
                      </TabsContent>
                    ));
                  })}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
