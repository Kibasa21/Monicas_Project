import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
 
export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="en" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="en">wn</SelectItem>
          <SelectItem value="pt-BR">pt-BR</SelectItem>
          <SelectItem value="de">de</SelectItem>
          <SelectItem value="fr">fr</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}