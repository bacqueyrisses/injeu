"use client";
import AudioPlayer from "@/components/AudioPlayer";
import { notFound } from "next/navigation";
import { CongratulationData } from "@/data/congratulation-data";
import { useState } from "react";
import { useTimer } from "@/providers/TimerProvider";
import { formatMillisecondsToTime } from "@/utils/helpers";

export default function CongratulationPage() {
  const [creditsVisible, setCreditsVisible] = useState(false);
  const { lapse } = useTimer();

  const congratulationData = CongratulationData;
  if (!congratulationData) return notFound();

  function congratsFirstSection() {
    return (
      <>
        <section className="text-5xl w-full items-center justify-center h-1/6 flex">
          <span>{congratulationData.congrats.title}</span>
        </section>
        <section
          className={"flex flex-col items-center justify-center gap-1 text-xl"}
        >
          <span>Vous avez complété le jeu en :</span>{" "}
          {lapse !== 0 ? (
            <>
              <span className={"tracking-wider"}>
                {formatMillisecondsToTime(lapse)}
              </span>
            </>
          ) : (
            <span className={"tracking-wider opacity-50"}>00:00:00</span>
          )}
        </section>
      </>
    );
  }

  function creditsFirstSection() {
    return (
      <>
        <section className="text-5xl w-full items-center justify-center h-1/6 flex">
          <span>{congratulationData.credits.title}</span>
        </section>
        <section
          className={
            "flex flex-col items-center gap-10 text-xl w-11/12 sm:w-2/4 grow"
          }
        >
          <div className={"text-center"}>
            Ce travail est issu du partenariat entre l'Institut des Jeunes
            Aveugles et l'Ecole Nationale Supérieure des Arts Décoratifs de
            Paris.
          </div>
          <div className={"flex-col flex items-center justify-center gap-1"}>
            <span className={"text-2xl"}>Réalisation du projet</span>
            {congratulationData.credits.creators.map((creator, index) => (
              <span key={index} className={"text-xl"}>
                {creator}
              </span>
            ))}
          </div>
          <div className={"flex-col flex items-center justify-center gap-1"}>
            <span className={"text-2xl"}>Développement Web</span>
            <span className={"text-xl"}>{congratulationData.credits.dev}</span>
          </div>
        </section>
      </>
    );
  }

  return (
    <main
      className={
        "bg-primary flex flex-col w-full h-screen items-center justify-between"
      }
    >
      {creditsVisible ? creditsFirstSection() : congratsFirstSection()}
      <AudioPlayer
        className={creditsVisible ? "hidden" : "block"}
        currentData={congratulationData.congrats}
      />
      <section
        className={
          "h-min bg-injeu-light-red w-full flex items-center text-xl justify-start"
        }
      >
        <button onClick={() => setCreditsVisible(!creditsVisible)}>
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
      </section>
    </main>
  );
}
