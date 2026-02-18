"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/app/components/ui/chart";
import { getDashboardData } from "@/app/lib/data";
import { useTranslation } from "react-i18next";
import { convertAmount } from "@/app/lib/currency";

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;

interface CashFlowChartProps {
  data: DashboardData;
  selector?: React.ReactNode;
  rates: Record<string, number>;    
  baseCurrency: string;
};

export function CashFlowChart({ data, selector, baseCurrency, rates }: CashFlowChartProps) {

  const { t } = useTranslation("common")
  
  const incomeArray = Array.isArray(data.income) ? data.income : []

  const chartData = incomeArray.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    income: convertAmount(item.income, item.currency, baseCurrency, rates),
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const chartConfig = {
    income: { label: "Income", color: "#2F27CE" },
    spent: { label: "Spent", color: "#ef4444" },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)] border-none mb-4 bg-[rgb(var(--background))]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("cashFlow")}</CardTitle>
        <div className="flex items-center">
          {selector}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8}
                  minTickGap={32}
                  className="fill-black dark:fill-white"
                />
                <YAxis hide />
                <Tooltip />
                <Area
                  dataKey="income"
                  type="monotone"
                  fill="url(#fillIncome)"
                  stroke="var(--color-income)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}