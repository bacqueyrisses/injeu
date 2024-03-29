"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import Timer from "@/components/Timer";
import AudioPlayer from "@/components/AudioPlayer";
import { CodesData } from "@/data/codes-data";

interface SuccessPageI {
  params: { id: string };
}
export default function SuccessPage({ params }: SuccessPageI) {
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  if (!currentData) return notFound();

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <section
        className={
          "bg-secondary w-full h-1/6 inline-flex justify-center items-center text-6xl"
        }
      >
        <span>BRAVO</span>
      </section>
      <section className={"h-4/6 w-full flex items-center justify-center"}>
        <AudioPlayer
          currentData={{
            ...currentData,
            audio: currentData.secondAudio!,
            color: "white",
            fill: true,
          }}
        />
      </section>
      <Timer />
      <div
        className={
          "h-min bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
        <Link onClick={() => stop()} href={`/category/${params.id}`}>
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
