import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getCurrentUser } from "@/server/auth";

export async function POST(request: Request) {
  const response = await request.json();
  const { userId, group } = response;

  const allLevelsUnlocked = await db.category.findMany({
    where: { group, userId },
  });

  return NextResponse.json(allLevelsUnlocked);
}
