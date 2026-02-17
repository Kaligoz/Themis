"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { getDashboardData } from "@/app/lib/data";
import { SpendingByCategory }from "@/app/components/charts/SpendingByCategory";
import {IncomeExpenses} from "@/app/components/charts/IncomeChart";
import { CashFlowChart } from "@/app/components/charts/CashFlowChart";

interface DualChartDashboardProps {
    data: NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
};

type ChartType = "cashFlowChart" | "incomeChart" | "spendingCategoryChart"

export default function DualChartDashboard({data}: DualChartDashboardProps) {
    const [slot1, setSlot1] = useState<ChartType>("cashFlowChart")
    const [slot2, setSlot2] = useState<ChartType>("incomeChart")

    const chartOptions = [
        { value: "cashFlowChart", label: "Cash Flow" },
        { value: "incomeChart", label: "Income" },
        { value: "spendingCategoryChart", label: "Spending by Category" },
    ]

    const renderSelector = (currentValue: ChartType, onValueChange: (v: ChartType) => void) => {
        return (
            <Select value={currentValue} onValueChange={onValueChange}>
                <SelectTrigger className="h-8 text-xs border-none">
                    <span className="sr-only">
                        <SelectValue/>
                    </span>
                </SelectTrigger>
                <SelectContent className="bg-[rgb(var(--background))] border-none">
                    {chartOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select> 
        )
    }  

    const renderChart = (type: ChartType, slotNumber: number) => {
    
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
            case "cashFlowChart": return <CashFlowChart data={data} selector={selector} />
            case "incomeChart": return <IncomeExpenses data={data} selector={selector} />
            case "spendingCategoryChart": return <SpendingByCategory data={data} selector={selector} />
        }
    }

    return(
        <div className="flex flex-col">
            {renderChart(slot1, 1)}
            {renderChart(slot2, 2)}
        </div>
    )
}