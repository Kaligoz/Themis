"use server"

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function createSubscription(formData: FormData) {

    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if (!session) return { error: "Not authenticated" }
        
    const name = formData.get("name") as string    
    const currency = formData.get("currency") as string
    const categoryName = formData.get("category") as string
    const rawAmount = formData.get("amount")
    const rawBillingCycle = formData.get("cycle")

    const AmountValue = Math.round(Number(rawAmount))
    if (isNaN(AmountValue)) return { error: "Invalid amount" }

    const BillingCycleValue = Math.round(Number(rawBillingCycle))
    if (isNaN(BillingCycleValue)) return { error: "Invalid billing cycle value" }

    try {
        await db.subscription.create({
        data: {
            name: name,
            amount: AmountValue,
            currency: currency,
            billingCycle: BillingCycleValue,
            user: { connect: {id: session.user.id }},
            category: {
                connectOrCreate: {
                    where: {
                        name_userId: {
                            name: categoryName,
                            userId: session.user.id,
                        },
                    },
                    create: {
                        name: categoryName,
                        userId: session.user.id,
                    },
                },
            },
        },
        })
        
        revalidatePath("/") 
        return { success: true }

    } catch (error) {

    console.error("Database Error:", error)
    return { error: "Failed to save subscription" }

    }
}