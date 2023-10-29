"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface ICategoryStateSection {
  categoryCode: string;
  userId: string;
  currentCode: number;
  validCodes: number[];
}

export default async function CategoryStateSection({
  validCodes,
  categoryCode,
  userId,
  currentCode,
}: ICategoryStateSection) {
  const fetchUnlockedCategories = async () => {
    const response = await fetch(
      "http://localhost:3000/api/category/selectall",
      {
        method: "POST",
        body: JSON.stringify({
          categoryCode,
          userId,
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) throw new Error("Erreur serveur, réessayez.");

    return await response.json();
  };
  const categoriesUnlocked = await fetchUnlockedCategories();

  if (categoriesUnlocked.length === validCodes.length) redirect("/interlude");

  const fetchUnlockedCategory = async () => {
    const response = await fetch("http://localhost:3000/api/category/select", {
      method: "POST",
      body: JSON.stringify({
        categoryCode,
        userId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Erreur serveur, réessayez.");

    return await response.json();
  };
  const categoryUnlocked = await fetchUnlockedCategory();

  return (
    <>
      {categoryUnlocked ? (
        <div
          className={
            "bg-injeu-green w-full h-1/6 inline-flex justify-center items-center"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3.5"
            stroke="white"
            height={100}
            width={100}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      ) : (
        <Link
          href={`/code/${currentCode}`}
          className={
            "bg-injeu-red w-full h-1/6 inline-flex justify-center items-center"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            height={100}
            width={100}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </Link>
      )}
    </>
  );
}
