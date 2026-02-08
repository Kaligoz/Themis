
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";

interface IncomeDataCardsProps {
    data: Awaited<ReturnType<typeof getDashboardData>>;
}

export default async function IncomeDataCards({data}: IncomeDataCardsProps) {

    if (!data) return null

    const totalDebts = data.debts.reduce((acc, curr) => acc + curr.current, 0)
    const totalSubs = data.subs.reduce((acc, curr) => acc + curr.amount, 0)
    const totalPurchases = data.purchases.reduce((acc, curr) => acc + curr.amount, 0)

    const incomeValue = typeof data.income === "number" ? data.income : data.income.income

    const totalSpent = totalDebts + totalSubs + totalPurchases
    const remaining = incomeValue - totalSpent

    const statsCards = [
        { label: "Income", value: incomeValue },
        { label: "Spent", value: totalSpent },
        { label: "Remaining", value: remaining },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-3 m-4">
            {statsCards.map((stat, index) => (
                <Card key={index} className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)]">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base"> {stat.label} </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-medium">{stat.value}</div> 
                    </CardContent>
                </Card>
            ))}
        </div>
    )
};