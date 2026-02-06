"use server"

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function createDebt(formData: FormData) {

  const session = await auth.api.getSession({
    headers: await headers() 
  })

  if (!session) return { error: "Not authenticated" }
    
  const rawInitial = formData.get("initial")
  const rawCurrent = formData.get("current")
  const currency = formData.get("currency") as string
  const categoryName = formData.get("category") as string

  const initialValue = Math.round(Number(rawInitial))
  if (isNaN(initialValue)) return { error: "Invalid initial amount" }

  const currentValue = Math.round(Number(rawCurrent))
  if (isNaN(currentValue)) return { error: "Invalid current amount" }

  try {
    await db.debt.create({
      data: {
        initial: initialValue,
        current: currentValue,
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
    return { error: "Failed to save debt" }

  }
}