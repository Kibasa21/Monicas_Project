"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import React from "react"
import type { Table } from "@tanstack/react-table"
import { CalendarIcon } from "lucide-react"
import type { ShortList } from "./TodoList"
import useSupabaseBrowser from "@/utils/supabase-browser"
import { QueryClient, useMutation } from "@tanstack/react-query"
import type { TypedSupabaseClient } from "@/utils/types"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const FormSchema = z.object({
  title: z.string({
    required_error: "A title is required.",
  }).max(85, {
    message: "Title must not be longer than 15 characters.",
  }),
  description: z.string(),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
})

type FormSchemaType = z.infer<typeof FormSchema>

export function TodoForm({table}: {table: Table<ShortList>}) {
  const [open, setOpen] = React.useState(false)
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: ""
    }
  })

  const supabase = useSupabaseBrowser()
  const queryKey = ["todos", "status"]
  const queryClient = new QueryClient()

  // TODO: generate supabase types
  //       see: https://supabase.com/docs/reference/javascript/typescript-support
  //import { Database, Tables, Enums } from "./database.types.ts"

  const { mutateAsync, isPending } = useMutation({
    // TODO: https://supabase.com/docs/reference/javascript/typescript-support
    mutationFn: async (input: TypedSupabaseClient["Tables"]["TodoList"]["Insert"]) => {
      return await supabase.from('TodoList').insert(input).select()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey })
     console.log('success')
    },
    onError: () => {
      console.log('error')
    },
  })

  const onSubmit = async (values: FormSchemaType) => {
    let row = { ...values, status: "Pending" }

    if (values.deadline && values.deadline > new Date()) {
      row = { ...values, status: "In Progress" }
    }

    try {
      console.log({ row })
      const result = await mutateAsync(row)
      console.log({ result })
      queryClient.invalidateQueries({ queryKey })
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list. Time to get things done!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Save the world" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormDescription>
                    description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}