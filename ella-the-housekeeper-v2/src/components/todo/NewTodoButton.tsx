"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { DatePicker } from "../ui/date-picker"
import { formatRow, insertRow, supabase } from "@/lib/supabaseQuery";
import { FormEventHandler } from "react";
 
export function NewTodoButton() {

  return (
    <Dialog>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Save the world"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Clean the evilness from the world!"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Due to
            </Label>
            <DatePicker />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onSubmit={(title) => console.log(title)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}