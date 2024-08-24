import { UseFormReturn } from "react-hook-form";
import { Button } from "./button";
import FormInput from "./FormItems/form-input";
import FormTextArea from "./FormItems/form-textarea";
import FormDate from "./FormItems/form-date";
import { DialogFooter } from "./dialog";
import { z } from "zod"
import { insertRow, supabase } from "@/lib/supabaseQuery";

export default function FormatedForm({ children, className = "space-y-8", form, Submit = "Submit", FormSchema, setOpen }: {
    children: JSX.Element | JSX.Element[],
    className?: string,
    form: UseFormReturn<any, any, undefined>,
    Submit?: string,
    FormSchema: z.ZodObject<any, any>,
    setOpen: (value: React.SetStateAction<boolean>) => void
}): JSX.Element {

    type FormSchemaType = z.infer<typeof FormSchema>

    async function onSubmit(data: FormSchemaType) {
        let finished_data: Object;
        data.deadline > new Date() ?
            finished_data = { ...data, status: "In Progress" }
            :
            finished_data = { ...data, status: "Failed" };
        const {data: input, error} = await insertRow("TodoList", finished_data, supabase)
        console.log(input,error)
        setOpen(false);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
            {children}
            <DialogFooter>
                <Button type="submit">{Submit}</Button>
            </DialogFooter>
        </form>
    )
}

FormatedForm.input = FormInput;
FormatedForm.textarea = FormTextArea;
FormatedForm.date = FormDate;