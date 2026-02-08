"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardData } from "@/app/lib/data";
import { useState } from "react";
import { EditSubscriptionModal } from "../modals/EditSubscriptionModal";
import { formatCurrency } from "@/app/lib/utils"

interface TableTablePurchasesProps {
    data: DashboardData;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Subscription = DashboardData["subs"][number];

export function TableSubscription({data}: TableTablePurchasesProps) {

    const [isOpen, setIsOpen] = useState(false)

    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
    
    const handleRowClick = (subscription: Subscription) => {
        setSelectedSubscription(subscription);
        setIsOpen(true);
    };

    if (!data) return null

    return (
    <>
    <Card className="bg-[rgb(var(--background))] border-none shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] m-4">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Subscription</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Billing Cycle</TableHead>
                        <TableHead>Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody> 
                    {data.subs.map((subscriptions) => (
                        <TableRow 
                            key={subscriptions.id}
                            onClick={() => handleRowClick(subscriptions)}
                            className="cursor-pointer hover:bg-muted/50"
                        >
                            <TableCell>{subscriptions.name}</TableCell>
                            <TableCell>{formatCurrency(subscriptions.amount, subscriptions.currency)}</TableCell>
                            <TableCell>{subscriptions.billingCycle}</TableCell>
                            <TableCell>{subscriptions.category.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>

    <EditSubscriptionModal  isOpen={isOpen} setIsOpen={setIsOpen} data={data} selectedSubscription={selectedSubscription}/>
    </>
    )
};