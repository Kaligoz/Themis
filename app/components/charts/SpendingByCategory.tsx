"use client"

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from "@/app/components/ui/chart";
import { getDashboardData } from "@/app/lib/data";
import { useTranslation } from "react-i18next";
import { convertAmount } from "@/app/lib/currency";

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;

interface SpendingByCategoryProps {
  data: DashboardData;
  selector?: React.ReactNode;
  rates: Record<string, number>;
  baseCurrency: string;
};

const COLORS = [
  "#DDDBFF", 
  "#2F27CE", 
  "#AFA9FF",
  "#5A54E6",
  "#7B74F2",
  "#C6C2FF",
  "#3D36D9",
  "#8F89FF",
  "#4E47E0"
];

export function SpendingByCategory({data, selector, rates, baseCurrency}: SpendingByCategoryProps) {

  const { t } = useTranslation("common")

  if (!data) return null

  const chartData = data.categories.map((categoryName: string) => {

    const categoryPurchases = data.purchases.filter(p => p.category.name === categoryName)

    const categorySubs = data.subs.filter(s => s.category.name === categoryName)

    const totalPurchases = categoryPurchases.reduce((sum, p) => {
      return sum + convertAmount(p.amount, p.currency, baseCurrency, rates);
    }, 0)

    const totalSubs = categorySubs.reduce((sum, s) => {
      return sum + convertAmount(s.amount, s.currency, baseCurrency, rates);
    }, 0)

    const total = totalPurchases + totalSubs
    
    return {
      category: categoryName,
      amount: total,
      fill: `var(--color-${categoryName})`,
    }
  }).filter(c => c.amount > 0)

  const chartConfig = {
    amount: { label: "Amount" },
    ...chartData.reduce((acc, curr, index) => {
      acc[curr.category] = {
        label: curr.category,
        color: COLORS[index % COLORS.length],
      }
      return acc
    }, {} as ChartConfig),
  }

  return (
    <Card className="flex flex-col shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)] border-none max-h-[325px] mb-4 bg-[rgb(var(--background))]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg md:text-2xl">{t("spendingCategory")}</CardTitle>
          <CardDescription className="text-xs md:text-sm">{t("spendingCategoryDesc")}</CardDescription>
        </div>
        <div className="flex items-center">
          {selector}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px] w-full"
        >
          <PieChart>
            <Pie data={chartData} dataKey="amount" nameKey="category" cx="50%" cy="40%"/>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              className="flex-col gap-2 overflow-y-auto"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
};