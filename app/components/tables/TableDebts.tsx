"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";
import { useState } from "react";
import { EditDebtModal } from "../modals/EditDebtModal";
import { formatCurrency } from "@/app/lib/utils";

interface TableDebtsProps {
    data: DashboardData;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Debt = DashboardData["debts"][number];

export function TableDebts({data}: TableDebtsProps) {

    const [isOpen, setIsOpen] = useState(false)

    const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)

    const handleRowClick = (debt: Debt) => {
        setSelectedDebt(debt);
        setIsOpen(true);
    };

    if (!data) return null

    return (
    <>
    <Card className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] m-4">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Debts</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Inital</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Paid</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody> 
                    {data.debts.map((debt) => (
                        <TableRow 
                            key={debt.id} 
                            onClick={() => handleRowClick(debt)} 
                            className="cursor-pointer hover:bg-muted/50"
                        >
                            <TableCell>{debt.category.name}</TableCell>
                            <TableCell>{formatCurrency(debt.initial, debt.currency)}</TableCell>
                            <TableCell>{formatCurrency(debt.current, debt.currency)}</TableCell>
                            <TableCell>
                                {formatCurrency(debt.initial - debt.current, debt.currency)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>

    <EditDebtModal  isOpen={isOpen} setIsOpen={setIsOpen} data={data} selectedDebt={selectedDebt}/>
    </>
    )
};
