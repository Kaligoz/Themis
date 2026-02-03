"use client"

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/app/components/ui/combobox"

interface CategoryPickerProps {
  categories: string[];
}

export function CategoryPicker({ categories }: CategoryPickerProps) {

  return (
     <Combobox items={categories}>
      <ComboboxInput placeholder="Select a category" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}