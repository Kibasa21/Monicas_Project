'use client'

import React from "react";
import ChangeableImage from "./ChangeableImage";
import ListItem from "./ListItem";
import { shelfDescriptionsType } from "./Navigation-Menu";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "./ui/navigation-menu";

export default function ShelfHover({content}: {content: shelfDescriptionsType}): JSX.Element {

    const [image, setImage] = React.useState<number>(1);

    const onHover = (item: number) => {
      if (item !== image) {
        setImage(item);
      }
    }

    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base font-semibold">{content.navegationTitles[0]}</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                        <NavigationMenuLink asChild>
                            <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                            >
                                <ChangeableImage item={image} />
                            </a>
                        </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title={content.navegationDescriptions.shelfTitles[0]} className="" onMouseOver={() => onHover(1)}>
                        {content.navegationDescriptions.shelfDescriptions.foodSupplies}
                    </ListItem>
                    <ListItem href="/docs/installation" title={content.navegationDescriptions.shelfTitles[1]} className="" onMouseOver={() => onHover(2)}>
                        {content.navegationDescriptions.shelfDescriptions.cleaningSupplies}
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title={content.navegationDescriptions.shelfTitles[2]} className="" onMouseOver={() => onHover(3)}>
                        {content.navegationDescriptions.shelfDescriptions.hygieneSupplies}
                    </ListItem>
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}