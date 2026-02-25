"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";
import { useState } from "react";
import { EditPurchaseModal } from "../modals/EditPurchaseModal";
import { formatCurrency } from "@/app/lib/utils"
import { useTranslation } from "react-i18next";
import { convertAmount } from "@/app/lib/currency";

interface TablePurchasesProps {
    data: DashboardData;
    selector?: React.ReactNode;
    rates: Record<string, number>;    
    baseCurrency: string;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Purchase = DashboardData["purchases"][number];

export function TablePurchases({data, selector, baseCurrency, rates}: TablePurchasesProps) {

    const { t } = useTranslation("common")

    const [isOpen, setIsOpen] = useState(false)

    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
    
    const handleRowClick = (purchase: Purchase) => {
        setSelectedPurchase(purchase)
        setIsOpen(true)
    }

    if (!data) return null

    return (
    <>
    <Card className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)] m-4 w-[400px] h-[400px]">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base md:text-xl">{t("purchasesTable")}</CardTitle>

            <div className="flex items-center">
                {selector}
            </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto px-2">
            <Table>
                <TableHeader>
                    <TableRow> 
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("name")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("categoryTable")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("amountTable")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_tr]:border-b-0"> 
                    {data.purchases.map((purchases) => {

                        const convertedAmount = convertAmount(
                            purchases.amount, 
                            purchases.currency, 
                            baseCurrency, 
                            rates
                        )

                        return(
                            <TableRow 
                                key={purchases.id}
                                onClick={() => handleRowClick(purchases)}
                                className="cursor-pointer hover:bg-muted/50 h-10 transition-all hover:ring-1 hover:ring-black hover:ring-inset duration-200 rounded-md"
                            >
                                <TableCell className="px-2 py-1 text-xs md:text-sm truncate max-w-[120px]">{purchases.name}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">{purchases.category.name}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">{formatCurrency(convertedAmount, baseCurrency)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>

    <EditPurchaseModal  isOpen={isOpen} setIsOpen={setIsOpen} data={data} selectedPurchase={selectedPurchase}/>
    </>
    )
};