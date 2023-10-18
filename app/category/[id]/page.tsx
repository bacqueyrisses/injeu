import { CodesData } from "@/data/codes-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import { getCurrentTeam } from "@/server/auth";

interface CategoryPageI {
  params: { id: string };
}
export default async function CategoryPage({ params }: CategoryPageI) {
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  if (!currentData) return notFound();
  const team = await getCurrentTeam();

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
        <span>{currentData.title}</span>
      </div>
      <AudioPlayer currentData={currentData} />
      <Link
        href={`/code/${currentData.id}`}
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
