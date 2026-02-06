
import { db } from "@/app/lib/db";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 180 });
    }

    const categories = await db.category.findMany({
      where: { userId: session.user.id },
      select: { name: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories.map((c) => c.name));
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}