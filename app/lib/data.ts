
import { db } from "@/app/lib/db";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function getDashboardData() {

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return null

  const userId = session.user.id

  const [debts, subs, purchases, user, categories] = await Promise.all([
    db.debt.findMany({ where: { userId }, include: { category: true }}),
    db.subscription.findMany({ where: { userId }, include: { category: true }}),
    db.purchase.findMany({ where: { userId }, include: { category: true }}),
    db.user.findUnique({ where: { id: userId }, select: { income: true, baseCurrency: true }}),
    db.category.findMany({ where: { userId }, select: { name: true }}) 
  ])

  return { 
    debts, 
    subs, 
    purchases, 
    income: user?.income || 0,
    categories: categories.map(c => c.name),
    userBaseCurrency: user?.baseCurrency || "USD",
  }

}