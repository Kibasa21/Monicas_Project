"use client";;
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDescriptionCard } from "@/hooks/use-description-card";
import { useDescriptionStore } from "@/store/description-context";

import type { JSX } from "react";

export function DescriptionCard({
  className,
}: {
  className: string;
}): JSX.Element {
  const { showDescription: id } = useDescriptionStore();
  console.log("DescriptionCard", id);

  const { data, isLoading } = useDescriptionCard(id as number);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!data) {
    return <div>No data</div>;
  }

  return (
    <Card className={"relative w-[1050px] h-[550px] " + className}>
      <CardHeader>
        <CardTitle>{data[0].title}</CardTitle>
        <CardDescription>{"Status: " + data[0].status}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          style={{
            padding: "20px",
            margin: "20px 0",
            borderRadius: "5px",
          }}
        >
          <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
            {data[0].description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 right-0 gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
