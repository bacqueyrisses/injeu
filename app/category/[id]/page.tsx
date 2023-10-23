import { CodesData } from "@/data/codes-data";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import { getCurrentUser } from "@/server/auth";
import CategoryStateSection from "@/components/CategoryStateSection";
import { db } from "@/server/db";
interface CategoryPageI {
  params: { id: string };
}
export default async function CategoryPage({ params }: CategoryPageI) {
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  if (!currentData) return notFound();

  const user = await getCurrentUser();
  if (!user) return redirect("/start");

  const validCodes = CodesData.map((item) => item.id);
  const allLevelsUnlocked = await db.category.findMany({
    where: { userId: user.id, code: { in: validCodes } },
  });

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
        <span>{currentData.title}</span>
      </div>
      <AudioPlayer currentData={currentData} />
      <CategoryStateSection
        validCodes={validCodes}
        allLevelsUnlocked={allLevelsUnlocked}
        categoryCode={params.id}
        userId={user.id}
        currentCode={currentData.id}
      />
      <div
        className={
          "bg-injeu-blue h-min grow w-full inline-flex justify-center items-center text-3xl text-white"
        }
      >
        00:00:00
      </div>
      <div
        className={
          "h-min bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
        <Link
          href={{
            pathname: "/start",
            query: {
              play: "true",
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            height={80}
            width={80}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
