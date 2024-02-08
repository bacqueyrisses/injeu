import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import toast from "react-hot-toast";
import AudioPlayer from "@/components/AudioPlayer";
import { ICodesData } from "@/data/codes-data";

interface ICategoryStateSection {
  setAudioPlaying: Dispatch<SetStateAction<boolean>>;
  audioPlaying: boolean;
  categoryCode: string;
  currentData: ICodesData;
}

export default function CategoryStateSection({
  setAudioPlaying,
  audioPlaying,
  categoryCode,
  currentData,
}: ICategoryStateSection) {
  const [unlocked, setUnlocked] = useState<boolean | undefined>(undefined);
  const { data: categoryUnlocked, error: categoryUnlockedError } = useSWR(
    `/api/category/select/${categoryCode}`,
    fetcher,
  );

  useEffect(() => {
    categoryUnlockedError && toast.error("Erreur serveur, réessayez ! 2");
  }, [categoryUnlockedError]);

  useEffect(() => {
    categoryUnlocked && setUnlocked(true);
    categoryUnlocked === null && setUnlocked(false);
  }, [categoryUnlocked]);

  return (
    <>
      {unlocked === undefined ? (
        <>
          <div className={`h-3/6 w-full ${currentData.color}`}>
            <span className={"h-full w-full flex justify-center items-center"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={"gray"}
                width={300}
                height={300}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            </span>
          </div>
          <div
            className={`${currentData.color} w-full h-1/6 inline-flex justify-center items-center`}
          ></div>
        </>
      ) : unlocked ? (
        <>
          <AudioPlayer
            audioPlaying={audioPlaying}
            setAudioPlaying={setAudioPlaying}
            currentData={{ ...currentData, audio: currentData.secondAudio! }}
          />
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
        </>
      ) : !unlocked ? (
        <>
          <AudioPlayer
            audioPlaying={audioPlaying}
            setAudioPlaying={setAudioPlaying}
            currentData={currentData}
          />
          <div
            className={
              "w-full h-1/6 flex justify-center items-center bg-injeu-red w-full"
            }
          >
            <div className={"basis-1/3"} />
            <Link
              onClick={() => setAudioPlaying(false)}
              href={`/code/${currentData.id}`}
              className={
                "bg-injeu-red basis-1/3 inline-flex justify-center items-center"
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
            <Link
              href={`/code/hint/${currentData.id}`}
              className={
                "inline-flex justify-end items-center basis-1/3 md:pr-10 pr-4"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                height={100}
                width={100}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
}
