import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PendingListItem } from "./PendingListItem";
import { FallBackComponent } from "./ui/fall-back-component";
import ShelfHover from "./ShelfHover";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import useSupabaseServer from "@/utils/supabase-server";
import { getRowByStatus } from "@/api";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";

export type componentsType = {
  title: string;
  href: string;
  description: string;
};

export type shelfDescriptionsType = {
  navegationTitles: string[];
  navegationDescriptions: {
    shelfTitles: string[];
    shelfDescriptions: {
      foodSupplies: string;
      cleaningSupplies: string;
      hygieneSupplies: string;
    };
  };
};

export async function NavigationMenuComponent({
  content,
}: {
  content: shelfDescriptionsType;
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getRowByStatus(supabase, "Pending"));

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-0 md:space-x-5">
        <ShelfHover content={content} />
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-semibold">
            <Link href="/todo">{content.navegationTitles[1]}</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <PendingListItem />
            </HydrationBoundary>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={
                navigationMenuTriggerStyle() + " text-base font-semibold"
              }
            >
              {content.navegationTitles[2]}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={
                navigationMenuTriggerStyle() + " text-base font-semibold"
              }
            >
              {content.navegationTitles[3]}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
