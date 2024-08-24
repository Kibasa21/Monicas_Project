import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../input"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form";

export default function FormInput({ form, name, label, placeholder }: {
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
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            required
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}