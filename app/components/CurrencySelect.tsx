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
      <SelectTrigger className="w-full bg-[#DDDBFF] border-none">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((curr) => (
          <SelectItem key={curr.value} value={curr.value}>
            {curr.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}