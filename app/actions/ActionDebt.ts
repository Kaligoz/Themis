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

export async function createDebt(formData: FormData) {

  const session = await getSessionOrThrow()

  const initial = Math.round(Number(formData.get("initial")))
  const current = Math.round(Number(formData.get("current")))
  const currency = formData.get("currency") as string
  const categoryName = formData.get("category") as string

  try {
    await db.debt.create({
      data: {
        initial: initial,
        current: current,
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
};

export async function editDebt(formData: FormData) {

  const session = await getSessionOrThrow()

  const debtId = formData.get("debtId") as string  
  const initial = Math.round(Number(formData.get("initial")))
  const current = Math.round(Number(formData.get("current")))
  const currency = formData.get("currency") as string
  const categoryName = formData.get("category") as string

  try {
    await db.debt.update({
      where: { 
        id: debtId,
        userId: session.user.id 
      },
      data: {
        initial: initial,
        current: current,
        currency: currency,
        category: {
          connectOrCreate: {
            where: { name_userId: { name: categoryName, userId: session.user.id } },
            create: { name: categoryName, userId: session.user.id },
          },
        },
      },
    })
    
    revalidatePath("/") 
    return { success: true }

  } catch (error) {

    console.error("Database Error:", error)
    return { error: "Failed to update debt" }

  }
};

export async function deleteDebt(debtId: string) {
  
  const session = await getSessionOrThrow()

  try {
    await db.debt.delete({
      where: { 
        id: debtId, 
        userId: session.user.id 
      },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {

    console.error("Database Error:", error)
    return { error: "Failed to delete debt" }

  }
};