"use server"
import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

export async function updateBaseCurrency(formData: FormData) {

    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if (!session) return { error: "Not authenticated" }

    const currency = formData.get("currency") as string

    try{

        await db.user.update({
            where: { id: session.user.id },
            data: { baseCurrency: currency }
        })
        revalidatePath("/")
        return { success: true }

    } catch (error) {

        console.error("Database Error:", error)
        return { error: "Failed to save currency" }

    }
}