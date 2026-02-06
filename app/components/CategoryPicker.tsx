"use client"

import { useState } from "react"
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/app/components/ui/combobox"

interface CategoryPickerProps {
  categories: string[];
  name?: string;
}

export function CategoryPicker({ categories, name="category" }: CategoryPickerProps) {
  const [value, setValue] = useState("")

  return (
  <>
    <input type="hidden" name={name} value={value} />
    <Combobox 
        value={value} 
        onValueChange={(val) => {
          setValue(val ?? "")
        }}
      >
        <ComboboxInput 
          placeholder="Select or type..." 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-[rgb(var(--secondary))] border-none w-full"
        />
        <ComboboxContent className="z-[99] pointer-events-auto bg-[rgb(var(--secondary))] border">
          <ComboboxList>
            {categories.map((cat) => (
              <ComboboxItem 
                key={cat} 
                value={cat}
              >
                {cat}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
  </>
   
  )
}