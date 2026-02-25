"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";
import React, { useState } from "react";
import { EditDebtModal } from "../modals/EditDebtModal";
import { formatCurrency } from "@/app/lib/utils";
import { useTranslation } from "react-i18next";
import { convertAmount } from "@/app/lib/currency";

interface TableDebtsProps {
    data: DashboardData;
    selector?: React.ReactNode;
    rates: Record<string, number>;    
    baseCurrency: string;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Debt = DashboardData["debts"][number];

export function TableDebts({data, selector, baseCurrency, rates}: TableDebtsProps) {

    const { t } = useTranslation("common")

    const [isOpen, setIsOpen] = useState(false)

    const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)

    const handleRowClick = (debt: Debt) => {
        setSelectedDebt(debt)
        setIsOpen(true)
    }

    if (!data) return null

    return (
    <>
    <Card className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.2)] m-4 w-[400px] h-[400px]">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base md:text-xl">{t("debtsTable")}</CardTitle>

            <div className="flex items-center">
                {selector}
            </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto px-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("categoryTable")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("initial")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("current")}</TableHead>
                        <TableHead className="text-gray-500 text-xs md:text-sm hidden md:table-cell">{t("paidTable")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_tr]:border-b-0"> 
                    {data.debts.map((debt) => {

                        const convertedInitial = convertAmount(
                            debt.initial, 
                            debt.currency, 
                            baseCurrency, 
                            rates
                        )

                        const convertedCurrent = convertAmount(
                            debt.current, 
                            debt.currency, 
                            baseCurrency, 
                            rates
                        )

                       return( 
                            <TableRow 
                                key={debt.id} 
                                onClick={() => handleRowClick(debt)} 
                                className="cursor-pointer hover:bg-muted/50 h-10 transition-all hover:ring-1 hover:ring-black hover:ring-inset duration-200 rounded-md"
                            >
                                <TableCell className="px-2 py-1 text-xs md:text-sm truncate max-w-[120px]">{debt.category.name}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">{formatCurrency(convertedInitial, baseCurrency)}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">{formatCurrency(convertedCurrent, baseCurrency)}</TableCell>
                                <TableCell className="px-2 py-1 text-xs md:text-sm">
                                    {formatCurrency(convertedInitial - convertedCurrent, baseCurrency)}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>

    <EditDebtModal  isOpen={isOpen} setIsOpen={setIsOpen} data={data} selectedDebt={selectedDebt}/>
    </>
    )
};
