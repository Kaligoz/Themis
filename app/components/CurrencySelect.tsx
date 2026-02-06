import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

const CURRENCIES = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "UAH", label: "UAH" },
];

interface CurrencySelectProps {
  defaultValue?: string;
  name?: string; 
}

export function CurrencySelect({ defaultValue = "USD", name = "currency" }: CurrencySelectProps) {
  return (
    <Select name={name} defaultValue={defaultValue}>
      <SelectTrigger className="w-full bg-[rgb(var(--secondary))] border-none dark:bg-[rgb(var(--secondary))]">
        <SelectValue placeholder="Select Currency" className="text-gray-500"/>
      </SelectTrigger>
      <SelectContent className="bg-[rgb(var(--secondary))] border">
        {CURRENCIES.map((curr) => (
          <SelectItem key={curr.value} value={curr.value}>
            {curr.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}