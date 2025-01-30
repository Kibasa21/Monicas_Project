"use client";

import React, { useEffect, useState, type JSX } from "react";
import { cn } from "@/lib/utils"; // Assuming cn is a styling helper function
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@radix-ui/react-context-menu";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { imagesLink } from "../../../public/shelfImages/imagesLink";

interface FoodTabProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  aspectRatio: "portrait" | "square";
}

export const ShelfTabElement: React.FC<FoodTabProps> = ({
  id,
  name,
  aspectRatio,
  className,
  ...props
}): JSX.Element => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Link href={`${pathname}/${name}`}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <Image
                src={imagesLink[name]}
                alt={name}
                width={250}
                height={330}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>Add to Library</ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Playlist
                </ContextMenuItem>
                <ContextMenuSeparator />
                {/* {
                  playlists.map((playlist) => (
                    <ContextMenuItem key={playlist}>
                      // SVG Icon
                      {playlist}
                    </ContextMenuItem>
                  ))
                } */}
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem>Play Next</ContextMenuItem>
            <ContextMenuItem>Play Later</ContextMenuItem>
            <ContextMenuItem>Create Station</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Like</ContextMenuItem>
            <ContextMenuItem>Share</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{name}</h3>
          <p className="text-xs text-muted-foreground">{"Alguma Descrição"}</p>
        </div>
      </Link>
    </div>
  );
};
