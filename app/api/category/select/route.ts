import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getCurrentUser } from "@/server/auth";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false });

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const unlockedCategory = await db.category.findFirst({
    where: { userId: user.id, code: Number(code) },
  });

  return NextResponse.json(unlockedCategory);
}
