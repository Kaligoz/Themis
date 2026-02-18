import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";
import { formatCurrency } from "../lib/utils";
import { getExchangeRates, convertAmount } from "@/app/lib/currency"; 

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;

interface IncomeDataCardsProps {
    data: DashboardData;
}

export default async function IncomeDataCards({data}: IncomeDataCardsProps) {
    if (!data || !data.income) return null

    const incomeArray = Array.isArray(data.income) ? data.income : []
    if (incomeArray.length === 0) return null

    const rates = await getExchangeRates("USD")
    const baseCurrency = data.userBaseCurrency || "USD"

    const latestIncomeRecord = incomeArray[incomeArray.length - 1]
    const normalizedIncome = convertAmount(
        latestIncomeRecord.income, 
        latestIncomeRecord.currency, 
        baseCurrency, 
        rates
    )

    const totalDebts = data.debts.reduce((acc, curr) => {
        return acc + convertAmount(curr.current, curr.currency, baseCurrency, rates)
    }, 0)

    const totalSubs = data.subs.filter(sub => sub.isActive).reduce((acc, curr) => {
        return acc + convertAmount(curr.amount, curr.currency, baseCurrency, rates)
    }, 0)

    const totalPurchases = data.purchases.reduce((acc, curr) => {
        return acc + convertAmount(curr.amount, curr.currency, baseCurrency, rates)
    }, 0)

    const totalSpent = totalDebts + totalSubs + totalPurchases
    const remaining = normalizedIncome - totalSpent

    const formatedIncome = formatCurrency(normalizedIncome, baseCurrency)
    const formatedSpent = formatCurrency(totalSpent, baseCurrency)
    const formatedRemaining = formatCurrency(remaining, baseCurrency)

    const statsCards = [
        { label: "Income", value: formatedIncome },
        { label: "Spent", value: formatedSpent },
        { label: "Remaining", value: formatedRemaining },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-3 m-4">
            {statsCards.map((stat, index) => (
                <Card key={index} className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)]">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">{stat.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-medium">{stat.value}</div> 
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};