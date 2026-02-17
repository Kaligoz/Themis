"use server"

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

async function getSessionOrThrow() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error("Not authenticated")
  return session
};

export async function createSubscription(formData: FormData) {

    const session = await getSessionOrThrow()
        
    const name = formData.get("name") as string    
    const currency = formData.get("currency") as string
    const categoryName = formData.get("category") as string
    const amount = Math.round(Number(formData.get("amount")))
    const billingCycle = Math.round(Number(formData.get("cycle")))

    try {
        await db.subscription.create({
        data: {
            name: name,
            amount: amount,
            currency: currency,
            billingCycle: billingCycle,
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
};

export async function editSubscription(formData: FormData) {

    const session = await getSessionOrThrow()

    const subscriptionId = formData.get("subscriptionId") as string
    const name = formData.get("name") as string    
    const currency = formData.get("currency") as string
    const categoryName = formData.get("category") as string
    const amount = Math.round(Number(formData.get("amount")))
    const billingCycle = Math.round(Number(formData.get("cycle")))
    const isActive = formData.get("isActive") === "on"

    try {
        await db.subscription.update({
            where: {
            id: subscriptionId,
            userId: session.user.id
            },
            data: {
                name: name,
                amount: amount,
                currency: currency,
                billingCycle: billingCycle,
                isActive: isActive,
                category: {
                    connectOrCreate: {
                        where: { name_userId: { name: categoryName, userId: session.user.id} },
                        create: { name: categoryName, userId: session.user.id },
                    },
                },
            },
        })

        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Database Error:", error)
        return { error: "Failed to update subscription"}
    }
};

export async function deleteSubscription(subscriptionId: string) {
  const session = await getSessionOrThrow()

  try {
    await db.subscription.delete({
      where: {
        id: subscriptionId,
        userId: session.user.id
      },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Database Error:", error)
    return{ error: "Failed to delete subscription"}
  }
};