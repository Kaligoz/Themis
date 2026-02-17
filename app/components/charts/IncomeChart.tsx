"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/app/components/ui/chart";
import { getDashboardData } from "@/app/lib/data";
import { useTranslation } from "react-i18next";

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;

interface IncomeExpensesProps {
  data: DashboardData;
  selector?: React.ReactNode;
};

export function IncomeExpenses({ data, selector }: IncomeExpensesProps) {

  const { t } = useTranslation("common")
  
  if (!data) return null

  const incomeArray = Array.isArray(data.income) ? data.income : []
  if (incomeArray.length === 0) return null
  const latestIncomeRecord = incomeArray[incomeArray.length - 1]

  const totalDebts = data.debts?.reduce((acc: number, curr) => acc + curr.current, 0) || 0;
  const totalSubs = data.subs?.filter((sub) => sub.isActive).reduce((acc: number, curr) => acc + curr.amount, 0) || 0;
  const totalPurchases = data.purchases?.reduce((acc: number, curr) => acc + curr.amount, 0) || 0;

  const totalSpent = totalDebts + totalSubs + totalPurchases;
  const incomeValue = latestIncomeRecord.income

  const chartData = [
    { name: "Income", value: incomeValue },
    { name: "Spent", value: totalSpent }
  ];

  const chartConfig = {
    value: { label: "Amount", color: "#2F27CE" },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)] border-none mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("incomeVsExp")}</CardTitle>
          <CardDescription>{t("incomeVsExpDesc")}</CardDescription>
        </div>
        <div className="flex items-center">
          {selector}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
              >
                <XAxis type="number" hide domain={[0, 'dataMax + 1000']} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <Tooltip cursor={false} />
                <Bar 
                  dataKey="value" 
                  fill="#2F27CE" 
                  radius={[0, 4, 4, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}