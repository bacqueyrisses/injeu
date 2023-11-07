"use client";
import { CodesData } from "@/data/codes-data";
import { notFound, useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import CategoryStateSection from "@/components/CategoryStateSection";
import Timer from "@/components/Timer";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface CategoryPageI {
  params: { id: string };
}
export default function CategoryPage({ params }: CategoryPageI) {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const router = useRouter();

  const currentData = CodesData.find((data) => String(data.id) === params.id);

  const { data: categoriesUnlocked, error: categoriesUnlockedError } = useSWR(
    `/api/category/selectall/${currentData?.group}`,
    fetcher,
  );

  useEffect(() => {
    categoriesUnlockedError && toast.error("Erreur serveur, réessayez !");
  }, [categoriesUnlockedError]);

  if (!currentData) return notFound();

  const validCodes = CodesData.filter((item) => {
    return item.group === currentData.group && item.secret;
  }).map((item) => item.id);

  const handleBackButton = () => {
    setAudioPlaying(false);

    if (
      currentData.group === 1 &&
      categoriesUnlocked?.length === validCodes.length
    )
      return router.push("/interlude");

    if (
      currentData.group === 2 &&
      categoriesUnlocked?.length === validCodes.length
    )
      router.push("/category/999");

    if (
      currentData.group === 3 &&
      categoriesUnlocked?.length === validCodes.length
    )
      router.push("/category/1234567890");
  };

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <Toaster />
      <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
        <span>{currentData.title}</span>
      </div>

      {currentData.secret ? (
        <CategoryStateSection
          setAudioPlaying={setAudioPlaying}
          categoryCode={params.id}
          currentData={currentData}
          audioPlaying={audioPlaying}
        />
      ) : (
        <AudioPlayer
          audioPlaying={audioPlaying}
          setAudioPlaying={setAudioPlaying}
          currentData={currentData}
        />
      )}
      <Timer />
      <div
        className={
          "h-min bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
        {categoriesUnlocked?.length === validCodes.length ? (
          <button onClick={handleBackButton}>
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
          </button>
        ) : (
          <Link
            onClick={() => setAudioPlaying(false)}
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
        )}
      </div>
    </main>
  );
}
