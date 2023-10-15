"use client";
import { useState } from "react";
import { CodesData } from "@/data/codes-data";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";

interface CodeSpecificPageI {
  params: { id: string };
}
export default function CodeSpecificPage({ params }: CodeSpecificPageI) {
  const router = useRouter();
  const currentData = CodesData.find((data) => String(data.id) === params.id);

  const secretCode = currentData?.secret;
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [activeCode, setActiveCode] = useState(1);
  const [error, setError] = useState(false);

  if (!currentData) return notFound();

  const handleNumberClick = (number: string) => {
    if (code4 && activeCode === 4) return;

    if (activeCode === 1) {
      setCode1(number);
      setActiveCode(2);
    } else if (activeCode === 2) {
      setCode2(number);
      setActiveCode(3);
    } else if (activeCode === 3) {
      setCode3(number);
      setActiveCode(4);
    } else {
      setCode4(number);
      validateCode(Number(code1 + code2 + code3 + number));
    }
  };

  const validateCode = (completeCode: number) => {
    if (secretCode === completeCode) {
      void router.push(`/code/success/${currentData.id}`);
    } else {
      setError(true);

      setTimeout(() => {
        setError(false);
        setCode1("");
        setCode2("");
        setCode3("");
        setCode4("");
        setActiveCode(1);
      }, 1300);
    }
  };

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <section
        className={
          "h-1/6 w-full bg-secondary flex items-center justify-center text-6xl"
        }
      >
        <span>CODE</span>
      </section>
      <section
        className={
          "h-2/6 bg-injeu-blue w-full flex items-center justify-center gap-4"
        }
      >
        <span
          className={`text-7xl w-1/5 h-2/3 inline-flex justify-center items-center ${
            error ? "bg-injeu-light-red transition-colors" : "bg-white"
          }`}
        >
          {code1}
        </span>
        <span
          className={`text-7xl w-1/5 h-2/3 inline-flex justify-center items-center ${
            error ? "bg-injeu-light-red transition-colors" : "bg-white"
          }`}
        >
          {code2}
        </span>
        <span
          className={`text-7xl w-1/5 h-2/3 inline-flex justify-center items-center ${
            error ? "bg-injeu-light-red transition-colors" : "bg-white"
          }`}
        >
          {code3}
        </span>
        <span
          className={`text-7xl w-1/5 h-2/3 inline-flex justify-center items-center ${
            error ? "bg-injeu-light-red transition-colors" : "bg-white"
          }`}
        >
          {code4}
        </span>
      </section>
      <section className={"h-3/6 w-full grid grid-cols-3 grid-rows-4 text-6xl"}>
        <button
          onClick={() => handleNumberClick("1")}
          className={
            "bg-injeu-light-green inline-flex justify-center items-center"
          }
        >
          1
        </button>
        <button
          onClick={() => handleNumberClick("2")}
          className={"inline-flex justify-center items-center"}
        >
          2
        </button>
        <button
          onClick={() => handleNumberClick("3")}
          className={
            "bg-injeu-light-green inline-flex justify-center items-center"
          }
        >
          3
        </button>
        <button
          onClick={() => handleNumberClick("4")}
          className={"inline-flex justify-center items-center"}
        >
          4
        </button>
        <button
          onClick={() => handleNumberClick("5")}
          className={
            "bg-injeu-light-green inline-flex justify-center items-center"
          }
        >
          5
        </button>
        <button
          onClick={() => handleNumberClick("6")}
          className={"inline-flex justify-center items-center"}
        >
          6
        </button>
        <button
          onClick={() => handleNumberClick("7")}
          className={
            "bg-injeu-light-green inline-flex justify-center items-center"
          }
        >
          7
        </button>
        <button
          onClick={() => handleNumberClick("8")}
          className={"inline-flex justify-center items-center"}
        >
          8
        </button>
        <button
          onClick={() => handleNumberClick("9")}
          className={
            "bg-injeu-light-green inline-flex justify-center items-center"
          }
        >
          9
        </button>
        <Link
          href={`/category/${currentData.id}`}
          className={
            "inline-flex justify-center items-center bg-injeu-light-red"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            height={70}
            width={70}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </Link>
        <button
          onClick={() => handleNumberClick("0")}
          className={
            "bg-injeu-light-green inline-flex justify-center items-center"
          }
        >
          0
        </button>
        <Link
          href={`/code/hint/${currentData.id}`}
          className={"inline-flex justify-center items-center bg-injeu-red"}
        >
          ?
        </Link>
      </section>
    </main>
  );
}
