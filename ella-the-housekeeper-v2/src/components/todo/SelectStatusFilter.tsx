import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectStatusFilter({placeholder, label, content, filter, className}: {
    placeholder: string,
    label: string,
    content: string[],
    filter: React.Dispatch<React.SetStateAction<string>>,
    className?: string
}) {
  return (
    <Select onValueChange={filter}>
      <SelectTrigger className={"w-[180px] "+className}>
        <SelectValue placeholder={placeholder} className="text-9xl" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {content.map((item) => (
            <SelectItem
              key={item}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
