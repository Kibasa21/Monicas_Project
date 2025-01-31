"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import React from "react";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { QueryClient, useMutation } from "@tanstack/react-query";
import type { TypedSupabaseClient } from "@/utils/types";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "./Reader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "A title is required.",
    })
    .max(85, {
      message: "Title must not be longer than 15 characters.",
    }),
  unit: z.string({
    required_error: "Please select an email to display.",
  }),
  qnt: z.string({
    required_error: "Please enter the quantity.",
  }),
  pricePerUnit: z.string({
    required_error: "Please enter the price per unit.",
  }),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function Organizer({ products }: { products: Product[] }) {
  const [open, setOpen] = React.useState(true);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const supabase = useSupabaseBrowser();
  const queryKey = ["todos", "status"];
  const queryClient = new QueryClient();

  // TODO: generate supabase types
  //       see: https://supabase.com/docs/reference/javascript/typescript-support
  //import { Database, Tables, Enums } from "./database.types.ts"

  const { mutateAsync, isPending } = useMutation({
    // TODO: https://supabase.com/docs/reference/javascript/typescript-support
    mutationFn: async (
      input: TypedSupabaseClient["Tables"]["TodoList"]["Insert"]
    ) => {
      return await supabase.from("TodoList").insert(input).select();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    // let row = { ...values, status: "Pending" };
    // if (values.deadline && values.deadline > new Date()) {
    //   row = { ...values, status: "In Progress" };
    // }
    // try {
    //   console.log({ row });
    //   const result = await mutateAsync(row);
    //   console.log({ result });
    //   queryClient.invalidateQueries({ queryKey });
    //   setOpen(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Organize the products</DialogTitle>
          <DialogDescription>
            Put the products on the right shelves
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-72 w-full rounded-md">
              <div className="grid grid-cols-1 gap-y-10">
                {products.map((product, index) => (
                  <div
                    key={product.code}
                    className="border border-solid rounded-md"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Croissant"
                              {...field}
                              defaultValue={product.name}
                            />
                          </FormControl>
                          <FormDescription>
                            {"Put the name of your " +
                              (index + 1) +
                              "th product here"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>description</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={product.unit}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="UN">UN</SelectItem>
                              <SelectItem value="KG">KG</SelectItem>
                              <SelectItem value="L">L</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {"Select the unit of your " +
                              (index + 1) +
                              "th product here"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="qnt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="20"
                              {...field}
                              defaultValue={product.quantity.toString()}
                            />
                          </FormControl>
                          <FormDescription>
                            {"Put the quantity of your " +
                              (index + 1) +
                              "th product here"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pricePerUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{"Price per unit (R$/UN)"}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="20"
                              {...field}
                              defaultValue={product.pricePerUnit.toString()}
                            />
                          </FormControl>
                          <FormDescription>
                            {"Put the price per unit of your " +
                              (index + 1) +
                              "th product here"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Your date of birth is used to calculate your age.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
