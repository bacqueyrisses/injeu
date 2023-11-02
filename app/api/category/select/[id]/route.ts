import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const categoryCode = params.id;

  const unlockedCategory = await db.category.findFirst({
    where: { userId: user.id, code: Number(categoryCode) },
  });
  revalidatePath(`/code/${categoryCode}`);

  return NextResponse.json(unlockedCategory);
}
