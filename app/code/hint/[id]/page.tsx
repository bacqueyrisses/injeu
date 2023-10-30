"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import useSound from "use-sound";
import { CodesData } from "@/data/codes-data";

interface SuccessPageI {
  params: { id: string };
}
export default function HintPage({ params }: SuccessPageI) {
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  if (!currentData) return notFound();

  // page is redirected, hook isn't called conditionally
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [play] = useSound(currentData.hint);

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <section
        className={
          "bg-secondary w-full h-1/6 inline-flex justify-center items-center text-6xl"
        }
      >
        <span>INDICE</span>
      </section>
      <section
        className={"h-4/6 w-full flex items-center justify-center bg-injeu-red"}
      >
        <button onClick={() => play()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            height={350}
            width={350}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>
      </section>
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
        <Link href={`/code/${params.id}`}>
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
        </Link>
      </div>
    </main>
  );
}
