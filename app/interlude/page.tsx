"use client";
import { useEffect } from "react";
import { useTimer } from "@/providers/TimerProvider";
import useSound from "use-sound";
import Timer from "@/components/Timer";

export default function InterludePage() {
  const { pauseTimer } = useTimer();
  const [play] = useSound("/audios/0.mp3");

  useEffect(() => {
    pauseTimer();
    play();
  }, []);

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <section
        className={
          "h-1/6 w-full bg-secondary flex items-center justify-center text-5xl flex-col gap-3"
        }
      >
        <span>ENTRE</span>
        <span>ACTE</span>
      </section>
      <section
        className={
          "h-4/6 w-full bg-injeu-light-green flex flex-col items-center justify-center text-8xl text-white"
        }
      >
        <span>09</span>
        <span>—</span>
        <span>14</span>
      </section>
      <section
        className={
          "bg-injeu-blue h-1/6 w-full inline-flex justify-center items-center text-5xl text-white"
        }
      >
        <Timer />
      </section>
    </main>
  );
}
