"use client";
import { notFound, useRouter } from "next/navigation";
import useSound from "use-sound";
import { CodesData } from "@/data/codes-data";
import Timer from "@/components/Timer";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

interface SuccessPageI {
  params: { id: string };
}
export default function HintPage({ params }: SuccessPageI) {
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  const { back } = useRouter();
  if (!currentData?.hint) return notFound();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [play, { pause, stop }] = useSound(currentData.hint, {
    onload: () => {
      setAudioLoaded(true);
    },
    onend: () => {
      setAudioStarted(false);
    },
  });

  const handleAudio = () => {
    setAudioStarted((v) => !v);
    if (audioStarted) {
      toast.success("Indice en pause");
      pause();
      setAudioStarted(false);
    } else {
      toast.success("Indice en écoute !");
      play();
      setAudioStarted(true);
    }
  };

  const handleBackButton = () => {
    stop();
    back();
  };

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <Toaster />
      <section
        className={
          "bg-secondary w-full h-1/6 inline-flex justify-center items-center text-6xl"
        }
      >
        <span>INDICE</span>
      </section>
      <section
        className={"h-4/6 w-full flex items-center justify-center bg-injeu-red"}
      >
        <button onClick={handleAudio} disabled={!audioLoaded}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={audioLoaded ? "white" : "gray"}
            height={350}
            width={350}
            className={audioStarted ? "animate-pulse" : ""}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>
      </section>
      <Timer />
      <div
        className={
          "h-min bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
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
      </div>
    </main>
  );
}
