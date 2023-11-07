"use client";
import { useEffect, useState } from "react";
import { useTimer } from "@/providers/TimerProvider";
import useSound from "use-sound";
import Timer from "@/components/Timer";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { formatMillisecondsToTimeWithoutHours } from "@/utils/helpers";

export default function InterludePage() {
  const [audioStarted, setAudioStarted] = useState(false);
  const { pauseTimer, startTimer } = useTimer();
  const [play, { stop, pause }] = useSound("/audios/ENTRACTE.mp4", {
    interrupt: true,
    onend: () => {
      setAudioStarted(false);
    },
  });

  const duration = 10 * 60 * 1000;

  const [startTime, setStartTime] = useState<number | null>(null);

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    setStartTime(
      localStorage.getItem("startTime")
        ? parseInt(localStorage.getItem("startTime")!)
        : null,
    );
  }, []);

  useEffect(() => {
    pauseTimer();

    const interval = setInterval(() => {
      if (startTime === null) {
        const currentTime = new Date().getTime();
        setStartTime(currentTime);
        localStorage.setItem("startTime", currentTime.toString());
      } else {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const remainingTime = duration - elapsedTime;
        setTimeRemaining(remainingTime);

        if (elapsedTime >= duration) {
          setTimeRemaining(0);
          stop();
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, startTime]);

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
        onClick={() => startTimer()}
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
                formatMillisecondsToTimeWithoutHours(timeRemaining)
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
