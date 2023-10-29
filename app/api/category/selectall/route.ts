import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(request: Request) {
  const response = await request.json();
  const { validCodes, userId } = response;
  const allLevelsUnlocked = await db.category.findMany({
    where: { userId, code: { in: validCodes } },
  });

  return NextResponse.json(allLevelsUnlocked);
}
