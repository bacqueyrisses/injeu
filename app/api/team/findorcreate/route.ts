import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(request: Request) {
  const response = await request.json();
  const { username } = response;
  const team = await db.user.upsert({
    where: {
      username,
    },
    update: {},
    create: {
      username,
    },
  });

  return NextResponse.json(team);
}
