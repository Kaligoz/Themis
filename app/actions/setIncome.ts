"use server"

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function createIncome(formData: FormData) {

  const session = await auth.api.getSession({
    headers: await headers() 
  })

  if (!session) return { error: "Not authenticated" }
    
  const rawIncome = formData.get("income")
  const currency = formData.get("currency") as string

  const incomeValue = Math.round(Number(rawIncome))
  if (isNaN(incomeValue)) return { error: "Invalid amount" }

  try {
    await db.income.upsert({
      where: {
        userId: session.user.id, 
      },
      update: {
        income: incomeValue,   
        currency: currency,
      },
      create: {
        income: incomeValue,   
        currency: currency,
        userId: session.user.id,
      },
    })
    
    revalidatePath("/") 
    return { success: true }

  } catch (error) {

    console.error("Database Error:", error)
    return { error: "Failed to save income" }

  }
}