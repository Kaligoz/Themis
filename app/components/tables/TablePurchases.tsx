"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";
import { useState } from "react";
import { EditPurchaseModal } from "../modals/EditPurchaseModal";
import { formatCurrency } from "@/app/lib/utils"

interface TablePurchasesProps {
    data: DashboardData;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Purchase = DashboardData["purchases"][number];

export function TablePurchases({data}: TablePurchasesProps) {

    const [isOpen, setIsOpen] = useState(false)

    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
    
    const handleRowClick = (purchase: Purchase) => {
        setSelectedPurchase(purchase);
        setIsOpen(true);
    };

    if (!data) return null

    return (
    <>
    <Card className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] m-4">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Purchases</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody> 
                    {data.purchases.map((purchases) => (
                        <TableRow 
                            key={purchases.id}
                            onClick={() => handleRowClick(purchases)}
                            className="cursor-pointer hover:bg-muted/50"
                        >
                            <TableCell>{purchases.name}</TableCell>
                            <TableCell>{purchases.category.name}</TableCell>
                            <TableCell>{formatCurrency(purchases.amount, purchases.currency)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>

    <EditPurchaseModal  isOpen={isOpen} setIsOpen={setIsOpen} data={data} selectedPurchase={selectedPurchase}/>
    </>
    )
};