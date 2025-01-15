import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "../textarea";

import type { JSX } from "react";

export default function FormTextArea({ form, name, label, placeholder }: {
    form: UseFormReturn<any, any, undefined>,
    label: string,
    name: string,
    placeholder?: string,
}): JSX.Element {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="title" className="text-right">{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            {...field}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            value={field.value || ""}
                            required
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}