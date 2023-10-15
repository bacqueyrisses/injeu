"use client";
import { useState } from "react";
import useSound from "use-sound";
import Link from "next/link";

export default function StartPage() {
  const [init, setInit] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  function startSection() {
    const handleInit = () => {
      setInit(true);
    };

    return (
      <section
        className={
          "flex w-full h-full flex-col items-center justify-center text-center gap-16 bg-primary"
        }
      >
        <span className={"text-5xl px-20 leading-tight"}>NOM DE L'ÉQUIPE</span>
        <input type={"text"} className={"bg-stone-400 p-4 rounded-xl"} />
        <button
          onClick={handleInit}
          className={"px-4 py-2 bg-yellow-300 rounded-xl text-2xl"}
        >
          commencer
        </button>
      </section>
    );
  }

  function startedSection() {
    const handleAudio = () => {
      setAudioStarted((prev) => !prev);
    };
    return (
      <section
        className={"flex w-full h-screen flex-col items-center justify-between"}
      >
        <div className="text-6xl w-full items-center justify-center h-1/4 flex bg-secondary">
          <Link href={"/"}>ACCUEIL</Link>
        </div>
        <div
          className={
            "flex justify-center items-center w-full h-3/4 bg-injeu-blue"
          }
          onClick={handleAudio}
        >
          {audioStarted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width={300}
              height={300}
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width={300}
              height={300}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          )}
        </div>
      </section>
    );
  }

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      {!init && startSection()}
      {init && startedSection()}
    </main>
  );
}
