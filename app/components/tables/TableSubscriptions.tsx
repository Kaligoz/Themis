"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";
import { useState } from "react";
import { EditSubscriptionModal } from "../modals/EditSubscriptionModal";
import { formatCurrency } from "@/app/lib/utils"
import { useTranslation } from "react-i18next";
import { convertAmount } from "@/app/lib/currency";

interface TableTablePurchasesProps {
    data: DashboardData;
    selector?: React.ReactNode;
    rates: Record<string, number>;    
    baseCurrency: string;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Subscription = DashboardData["subs"][number];

export function TableSubscription({data, selector, rates, baseCurrency}: TableTablePurchasesProps) {

    const { t } = useTranslation("common")

    const [isOpen, setIsOpen] = useState(false)

    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
    
    const handleRowClick = (subscription: Subscription) => {
        setSelectedSubscription(subscription)
        setIsOpen(true)
    }

    if (!data) return null

    return (
    <>
    <Card className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)] m-4 w-[400px] h-[400px]">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base md:text-xl">{t("subscriptionTable")}</CardTitle>

            <div className="flex items-center">
                {selector}
            </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto px-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("name")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("amountTable")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("billingCycleTable")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("categoryTable")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_tr]:border-b-0"> 
                    {data.subs.map((subscriptions) => {

                        const convertedAmount = convertAmount(
                            subscriptions.amount, 
                            subscriptions.currency, 
                            baseCurrency, 
                            rates
                        )

                        return (
                            <TableRow 
                                key={subscriptions.id}
                                onClick={() => handleRowClick(subscriptions)}
                                className={!subscriptions.isActive ? "opacity-40 grayscale cursor-pointer h-10 transition-all hover:ring-1 hover:ring-black hover:ring-inset duration-200 rounded-md" : "cursor-pointer h-10 transition-all hover:ring-1 hover:ring-black hover:ring-inset duration-200 rounded-md"}
                            >
                                <TableCell className="px-2 py-1 text-xs md:text-sm truncate max-w-[120px]">{subscriptions.name}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">{formatCurrency(convertedAmount, baseCurrency)}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">{subscriptions.billingCycle}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">{subscriptions.category.name}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>

    <EditSubscriptionModal  isOpen={isOpen} setIsOpen={setIsOpen} data={data} selectedSubscription={selectedSubscription}/>
    </>
    )
};