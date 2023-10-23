import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(request: Request) {
  const response = await request.json();
  const { categoryCode, userId } = response;
  const unlockedCategory = await db.category.findFirst({
    where: { userId, code: Number(categoryCode) },
  });

  return NextResponse.json(unlockedCategory);
}
