import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const response = await request.json();

  const { group } = response;

  const allLevelsUnlocked = await db.category.findMany({
    where: { group, userId: user.id },
  });

  return NextResponse.json(allLevelsUnlocked);
}
