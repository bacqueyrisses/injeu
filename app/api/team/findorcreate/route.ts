import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(request: Request) {
  const response = await request.json();
  const { name } = response;
  const team = await db.user.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name,
    },
  });

  return NextResponse.json(team);
}
