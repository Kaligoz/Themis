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

export async function createPurchase(formData: FormData) {

  const session = await getSessionOrThrow()

  const name = formData.get("name") as string    
  const amount = Math.round(Number(formData.get("amount")))
  const currency = formData.get("currency") as string
  const categoryName = formData.get("category") as string

  try {
    await db.purchase.create({
      data: {
        name: name,
        amount: amount,
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
};

export async function editPurchase(formData: FormData) {

  const session = await getSessionOrThrow()

  const purchaseId = formData.get("purchaseId") as string
  const name = formData.get("name") as string    
  const amount = Math.round(Number(formData.get("amount")))
  const currency = formData.get("currency") as string
  const categoryName = formData.get("category") as string

  try {
    await db.purchase.update({
      where: {
        id: purchaseId,
        userId: session.user.id
      },
      data: {
        name: name,
        amount: amount,
        currency: currency,
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
    return { error: "Failed to update purchase"}
  }
};

export async function deletePurchase(purchaseId: string) {
  const session = await getSessionOrThrow()

  try {
    await db.purchase.delete({
      where: {
        id: purchaseId,
        userId: session.user.id
      },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Database Error:", error)
    return{ error: "Failed to delete purchase"}
  }
};