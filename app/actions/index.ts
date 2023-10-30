"use server";

import { db } from "@/server/db";
import { getCurrentUser } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function getUnlockedCategories({ group }) {
  const user = await getCurrentUser();
  if (!user) return;
  const unlockedCategories = await db.category.findMany({
    where: { group, userId: user.id },
  });

  return Promise.resolve(unlockedCategories);
}

export async function getUnlockedCategory({ categoryCode }) {
  const user = await getCurrentUser();
  if (!user) return;
  const unlockedCategory = await db.category.findFirst({
    where: { userId: user.id, code: Number(categoryCode) },
  });
  revalidatePath(`/code/${categoryCode}`);

  return Promise.resolve(unlockedCategory);
}
