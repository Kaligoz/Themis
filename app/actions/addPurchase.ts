"use server"

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function createPurchase(formData: FormData) {

  const session = await auth.api.getSession({
    headers: await headers() 
  })

  if (!session) return { error: "Not authenticated" }

  const name = formData.get("name") as string    
  const rawAmount = formData.get("amount")
  const currency = formData.get("currency") as string
  const categoryName = formData.get("category") as string

  const AmountValue = Math.round(Number(rawAmount))
  if (isNaN(AmountValue)) return { error: "Invalid amount" }


  try {
    await db.purchase.create({
      data: {
        name: name,
        amount: AmountValue,
        currency: currency,
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
    return { error: "Failed to save purchase" }

  }
}