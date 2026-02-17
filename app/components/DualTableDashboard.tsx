"use client"

import { useState } from "react"
import { TableDebts } from "@/app/components/tables/TableDebts";
import { TablePurchases } from "@/app/components/tables/TablePurchases";
import { TableSubscription } from "@/app/components/tables/TableSubscriptions";
import { getDashboardData } from "@/app/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DualTableDashboardProps {
    data: NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
    rates: Record<string, number>;    
    baseCurrency: string;
};

type TableType = "purchases" | "subs" | "debts"

export default function DualTableDashboard({data, rates, baseCurrency}: DualTableDashboardProps) {

    const [slot1, setSlot1] = useState<TableType>("purchases")
    const [slot2, setSlot2] = useState<TableType>("subs")

    const tableOptions = [
        { value: "purchases", label: "Purchases" },
        { value: "subs", label: "Subscriptions" },
        { value: "debts", label: "Debts" },
    ]

    const renderSelector = (currentValue: TableType, onValueChange: (v: TableType) => void) => {
        return (
            <Select value={currentValue} onValueChange={onValueChange}>
                <SelectTrigger className="h-8 text-xs border-none">
                    <span className="sr-only">
                        <SelectValue/>
                    </span>
                </SelectTrigger>
                <SelectContent className="bg-[rgb(var(--background))] border-none">
                    {tableOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select> 
        )
    }    

    const renderTable = (type: TableType, slotNumber: number) => {

        const isSlot1 = slotNumber === 1
        const currentVal = isSlot1 ? slot1 : slot2
        const otherVal = isSlot1 ? slot2 : slot1
        const setSelf = isSlot1 ? setSlot1 : setSlot2
        const setOther = isSlot1 ? setSlot2 : setSlot1

        const selector = renderSelector(currentVal, (val) => {
            if (val === otherVal) setOther(currentVal) 
            setSelf(val)
        })

        switch (type) {
            case "purchases": return <TablePurchases data={data} selector={selector} baseCurrency={baseCurrency} rates={rates}/>
            case "subs": return <TableSubscription data={data} selector={selector} baseCurrency={baseCurrency} rates={rates}/>
            case "debts": return <TableDebts data={data} selector={selector} baseCurrency={baseCurrency} rates={rates}/>
        }
    }

    return(
        <div className="flex flex-col">
            {renderTable(slot1, 1)}
            {renderTable(slot2, 2)}
        </div>
    )
}