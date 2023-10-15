"use client";
import { useState } from "react";
import useSound from "use-sound";
import Link from "next/link";

export default function StartPage() {
  const [init, setInit] = useState(false);
  const [firstAudioStarted, setFirstAudioStarted] = useState(false);
  const [secondAudioStarted, setSecondAudioStarted] = useState(false);
  const [playFirst, { pause: pauseFirst }] = useSound("/audios/0.mp3", {
    onend: () => {
      setFirstAudioEnded(true);
      setFirstAudioStarted(false);
    },
  });
  const [playSecond, { pause: pauseSecond }] = useSound("/audios/1.mp3", {
    onend: () => {
      setSecondAudioEnded(true);
      setSecondAudioStarted(false);
    },
  });
  const [firstAudioEnded, setFirstAudioEnded] = useState(false);
  const [secondAudioEnded, setSecondAudioEnded] = useState(false);

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
    const handleFirstAudio = () => {
      setFirstAudioStarted((prev) => !prev);
      firstAudioStarted ? pauseFirst() : playFirst();
    };
    const handleSecondAudio = () => {
      setSecondAudioStarted((prev) => !prev);
      secondAudioStarted ? pauseSecond() : playSecond();
    };

    return (
      <section
        className={"flex w-full h-screen flex-col items-center justify-between"}
      >
        {secondAudioEnded ? (
          <>
            <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
              <span>JOUER</span>
            </div>
            <div
              className={
                "flex justify-center items-center w-full h-4/6 bg-injeu-red"
              }
            >
              <span className={"text-9xl text-white"}>GO!</span>
            </div>
            <div
              className={
                "h-1/6 bg-injeu-light-red w-full flex items-center justify-start"
              }
            >
              <span onClick={() => setSecondAudioEnded(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  height={110}
                  width={110}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
              </span>
            </div>
          </>
        ) : firstAudioEnded ? (
          <>
            <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
              <span>PROLOGUE</span>
            </div>
            <div
              className={
                "flex justify-center items-center w-full h-4/6 bg-injeu-red"
              }
              onClick={handleSecondAudio}
            >
              {secondAudioStarted ? (
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
            <div
              className={
                "h-1/6 bg-injeu-light-red w-full flex items-center justify-start"
              }
            >
              <span onClick={() => setFirstAudioEnded(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  height={110}
                  width={110}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
              <span>ACCUEIL</span>
            </div>
            <div
              className={
                "flex justify-center items-center w-full h-5/6 bg-injeu-blue"
              }
              onClick={handleFirstAudio}
            >
              {firstAudioStarted ? (
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
          </>
        )}
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
