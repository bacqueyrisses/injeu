import Link from "next/link";

interface WelcomeSectionI {
  handleFirstAudio: () => void;
  stopFirstAudio: () => void;
  firstAudioStarted: boolean;
  firstAudioLoaded: boolean;
}
export default function WelcomeSection({
  handleFirstAudio,
  stopFirstAudio,
  firstAudioStarted,
  firstAudioLoaded,
}: WelcomeSectionI) {
  return (
    <>
      <Link
        onClick={() => stopFirstAudio()}
        href={"/"}
        className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary"
      >
        <span>ACCUEIL</span>
      </Link>
      <button
        className={
          "flex justify-center items-center w-full h-5/6 bg-injeu-blue"
        }
        onClick={handleFirstAudio}
        disabled={!firstAudioLoaded}
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
      </button>
    </>
  );
}
