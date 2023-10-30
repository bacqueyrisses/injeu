import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useTimer } from "@/providers/TimerProvider";

interface PlaySectionI {
  setSecondAudioEnded: Dispatch<SetStateAction<boolean>>;
}
export default function PlaySection({ setSecondAudioEnded }: PlaySectionI) {
  const { startTimer } = useTimer();

  return (
    <>
      <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
        <span>JOUER</span>
      </div>
      <Link
        href={"/code"}
        onClick={startTimer}
        className={"flex justify-center items-center w-full h-4/6 bg-primary"}
      >
        <span className={"text-9xl text-white"}>GO !</span>
      </Link>
      <div
        className={
          "h-1/6 bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
        <button onClick={() => setSecondAudioEnded(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
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
        </button>
      </div>
    </>
  );
}
