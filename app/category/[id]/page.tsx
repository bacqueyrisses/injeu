"use client";
import { CodesData } from "@/data/codes-data";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import { getCurrentUser } from "@/server/auth";
import CategoryStateSection from "@/components/CategoryStateSection";
import Timer from "@/components/Timer";
import { useState } from "react";

interface CategoryPageI {
  params: { id: string };
}
export default function CategoryPage({ params }: CategoryPageI) {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  if (!currentData) return notFound();

  const validCodes = CodesData.filter((item) => {
    return item.group === currentData.group && item.secret;
  }).map((item) => item.id);
  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
        <span>{currentData.title}</span>
      </div>
      <AudioPlayer
        audioPlaying={audioPlaying}
        setAudioPlaying={setAudioPlaying}
        currentData={currentData}
      />
      {currentData.secret && (
        <CategoryStateSection
          setAudioPlaying={setAudioPlaying}
          validCodes={validCodes}
          categoryCode={params.id}
          currentCode={currentData.id}
          group={currentData.group}
        />
      )}
      <Timer />
      <div
        className={
          "h-min bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
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
      </div>
    </main>
  );
}
