import { Dispatch, SetStateAction } from "react";

interface PrequelSectionI {
  handleSecondAudio: () => void;
  secondAudioStarted: boolean;
  setFirstAudioEnded: Dispatch<SetStateAction<boolean>>;
}
export default function PrequelSection({
  handleSecondAudio,
  secondAudioStarted,
  setFirstAudioEnded,
}: PrequelSectionI) {
  return (
    <>
      <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
        <span>PROLOGUE</span>
      </div>
      <button
        className={"flex justify-center items-center w-full h-4/6 bg-injeu-red"}
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
      </button>
      <div
        className={
          "h-1/6 bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
        <button onClick={() => setFirstAudioEnded(false)}>
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
