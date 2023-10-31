"use client";
import { useEffect, useState } from "react";
import { useTimer } from "@/providers/TimerProvider";
import useSound from "use-sound";
import Timer from "@/components/Timer";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function InterludePage() {
  const [audioStarted, setAudioStarted] = useState(false);
  const { pauseTimer, startTimer } = useTimer();
  const [play, { stop, pause }] = useSound("/audios/0.mp3", {
    interrupt: true,
    onend: () => {
      setAudioStarted(false);
    },
  });

  const duration = 10 * 60 * 1000; // 10 minutes in milliseconds

  const [startTime, setStartTime] = useState<number | null>(
    localStorage.getItem("startTime")
      ? parseInt(localStorage.getItem("startTime")!)
      : null,
  );

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    pauseTimer();

    const interval = setInterval(() => {
      if (startTime === null) {
        // If startTime is not set, set it and store it in localStorage
        const currentTime = new Date().getTime();
        setStartTime(currentTime);
        localStorage.setItem("startTime", currentTime.toString());
      } else {
        // Calculate the time remaining
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const remainingTime = duration - elapsedTime;
        setTimeRemaining(remainingTime);

        if (elapsedTime >= duration) {
          setTimeRemaining(0);
          stop();
          startTimer();
          clearInterval(interval);
        }
      }
    }, 1000); // Check every 1 second

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [duration, startTime]);

  function formatMillisecondsToTime(milliseconds: number) {
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }

  function interludeStartSection() {
    const handleAudio = () => {
      if (audioStarted) {
        pause();
        setAudioStarted(false);
        toast.success("Audio d'attente en pause");
      } else {
        play();
        setAudioStarted(true);
        toast.success("Audio d'attente lancé");
      }
    };
    return (
      <section
        className={
          "gap-20 h-4/6 w-full bg-injeu-light-green flex flex-col items-center justify-center text-8xl text-white"
        }
      >
        <div className={"flex flex-col items-center justify-center"}>
          <span>09</span>
          <span>—</span>
          <span>14</span>
        </div>
        <button onClick={handleAudio} className={"text-2xl"}>
          {audioStarted
            ? "Mettre en pause l'audio"
            : "Lancer l'audio d'attente"}
        </button>
      </section>
    );
  }

  function interludeEndSection() {
    return (
      <Link
        href={"/code"}
        className={
          "gap-20 h-4/6 w-full bg-primary flex flex-col items-center justify-center text-8xl text-white"
        }
      >
        GO !
      </Link>
    );
  }

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <Toaster />
      <section
        className={
          "h-1/6 w-full bg-secondary flex items-center justify-center text-5xl flex-col gap-3"
        }
      >
        <span>ENTRE</span>
        <span>ACTE</span>
      </section>
      {timeRemaining === 0 ? interludeEndSection() : interludeStartSection()}
      <section
        className={
          "bg-injeu-blue h-1/6 w-full inline-flex flex-col justify-center items-center text-5xl text-white"
        }
      >
        <Timer />
        {timeRemaining !== 0 && (
          <div className={"text-3xl grow"}>
            Revenez dans{" "}
            <span
              className={
                "w-28 inline-flex justify-start items-center tracking-wider"
              }
            >
              {timeRemaining !== null ? (
                formatMillisecondsToTime(timeRemaining)
              ) : (
                <span>⏳⏳⏳</span>
              )}
            </span>
          </div>
        )}
      </section>
    </main>
  );
}
