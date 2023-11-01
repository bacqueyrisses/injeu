import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const response = await request.json();

  const { categoryName, categoryCode, group } = response;

  const validateCategory = await db.category.create({
    data: { name: categoryName, userId: user.id, code: categoryCode, group },
  });

  return NextResponse.json(validateCategory);
}
