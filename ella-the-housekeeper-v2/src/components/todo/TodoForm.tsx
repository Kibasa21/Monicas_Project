"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormatedForm from "../ui/formated-form"
import React from "react"
import { Table } from "@tanstack/react-table"
import { ShortList } from "./TodoList"

const FormSchema = z.object({
    deadline: z.date({
        required_error: "A date of birth is required.",
    }),
    title: z.string({
        required_error: "A title is required.",
    }).max(85, {
        message: "Title must not be longer than 15 characters.",
    }),
    description: z.string()
})

type FormSchemaType = z.infer<typeof FormSchema>

export function TodoForm({table}: {table: Table<ShortList>}) {
    const [open, setOpen] = React.useState(false);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: ""
        }
    })

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
                    <FormatedForm form={form} FormSchema={FormSchema} setOpen={setOpen} table={table}>
                        <FormatedForm.input form={form} name="title" label="Title:" placeholder="Save the world" />
                        <FormatedForm.textarea form={form} name="description" label="Description:" placeholder="Clean the evilness from the world!" />
                        <FormatedForm.date form={form} name="deadline" label="Due to:" />
                    </FormatedForm>
                </Form>
            </DialogContent>
        </Dialog>
    )
}