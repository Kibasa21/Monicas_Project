"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ChangeableImage from "./ChangeableImage"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuComponent({ content }: {
  content: {
    navegationTitles: string[];
    navegationDescriptions: {
      shelfTitles: string[];
      shelfDescriptions: {
        foodSupplies: string;
        cleaningSupplies: string;
        hygieneSupplies: string;
      };
    };
  }
}) {

  const [image, setImage] = React.useState<number>(1);

  const onHover = (item: number) => {
    if (item !== image) {
      setImage(item);
    }
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-0 md:space-x-5">
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
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-semibold"><Link href="/todo">{content.navegationTitles[1]}</Link></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className=""
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-base font-semibold"}>
              {content.navegationTitles[2]}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-base font-semibold"}>
              {content.navegationTitles[3]}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
