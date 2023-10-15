import { CodesData } from "@/data/codes-data";
import { notFound } from "next/navigation";
import Link from "next/link";
interface CodeSpecificPageI {
  params: { id: string };
}
export default function CodeSpecificPage({ params }: CodeSpecificPageI) {
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  if (!currentData) return notFound();

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <div className="text-6xl w-full items-center justify-center h-1/6 flex bg-secondary">
        <span>{currentData.title}</span>
      </div>
      <div
        className={
          "flex justify-center items-center w-full h-3/6" + currentData.color
        }
        // onClick={handleSecondAudio}
      >
        {/*{secondAudioStarted ? (*/}
        {true ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={currentData.title === "RADIO" ? "black" : "white"}
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
            fill={currentData.title === "RADIO" ? "black" : "white"}
            width={300}
            height={300}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={currentData.title === "RADIO" ? "black" : "white"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        )}
      </div>
      <button
        className={
          "bg-injeu-red w-full h-1/6 inline-flex justify-center items-center"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          height={100}
          width={100}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>
      <div
        className={
          "bg-injeu-blue h-min grow w-full inline-flex justify-center items-center text-3xl text-white"
        }
      >
        00:00:00
      </div>
      <div
        className={
          "h-min bg-injeu-light-red w-full flex items-center justify-start"
        }
      >
        <Link
          href={{
            pathname: "/start",
            query: {
              play: "true",
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
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
        </Link>
      </div>
    </main>
  );
}
