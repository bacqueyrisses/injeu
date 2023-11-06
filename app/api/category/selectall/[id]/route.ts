import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";

interface IParams {
  params: { id: string };
}
export async function GET(request: Request, { params }: IParams) {
  const user = await getCurrentUser();
  console.log(user);
  if (!user) redirect("/");

  const group = Number(params.id);

  const allLevelsUnlocked = await db.category.findMany({
    where: { group, userId: user.id },
  });

  return NextResponse.json(allLevelsUnlocked);
}
