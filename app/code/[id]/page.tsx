"use client";
import { useState } from "react";
import { CodesData } from "@/data/codes-data";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useTimer } from "@/providers/TimerProvider";
import useSound from "use-sound";

interface CodeSpecificPageI {
  params: { id: string };
}
export default function CodeSpecificPage({ params }: CodeSpecificPageI) {
  const variants = {
    default: {
      codeBg: "bg-injeu-blue",
      buttons: "bg-injeu-light-green text-black",
      exitBg: "bg-injeu-light-red",
    },
    mystery: {
      codeBg: "bg-black",
      buttons: "bg-black text-white",
      exitBg: "bg-white",
    },
  };

  const router = useRouter();
  const [playCorrect] = useSound("/audios/VALIDE.mp4");
  const [playWrong] = useSound("/audios/FAUX.mp4");
  const { pauseTimer } = useTimer();
  const currentData = CodesData.find((data) => String(data.id) === params.id);
  const mysteryData = CodesData.find((data) => data.group === 4);

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
      void validateCode(Number(code1 + code2 + code3 + number));
    }
  };

  const validateCode = async (completeCode: number) => {
    if (secretCode === completeCode) {
      playCorrect();
      if (params.id === String(mysteryData?.id)) {
        pauseTimer();
        return router.push("/congratulation");
      }

      const response = await fetch(
        "http://localhost:3000/api/category/create",
        {
          method: "POST",
          body: JSON.stringify({
            categoryCode: currentData.id,
            categoryName: currentData.title,
            group: currentData.group,
          }),
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) {
        setError(true);
        setTimeout(() => {
          setError(false);
          setCode1("");
          setCode2("");
          setCode3("");
          setCode4("");
          setActiveCode(1);
        }, 1400);
        return toast.error("Erreur serveur, réessayez.");
      }
      void router.push(`/code/success/${currentData.id}`);
    } else {
      playWrong();
      setError(true);
      toast.error("Mauvais code, réessayez !");

      setTimeout(() => {
        setError(false);
        setCode1("");
        setCode2("");
        setCode3("");
        setCode4("");
        setActiveCode(1);
      }, 1400);
    }
  };

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <Toaster toastOptions={{ duration: 1300 }} />
      <section
        className={
          "h-1/6 w-full bg-secondary flex items-center justify-center text-6xl"
        }
      >
        <span>{currentData.group === 4 ? currentData.title : "CODE"}</span>
      </section>
      <section
        className={`h-2/6 w-full flex items-center justify-center gap-4 ${
          currentData.group === 4
            ? variants.mystery.codeBg
            : variants.default.codeBg
        }`}
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
          className={`inline-flex justify-center items-center ${
            currentData.group === 4
              ? variants.mystery.buttons
              : variants.default.buttons
          }`}
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
          className={`inline-flex justify-center items-center ${
            currentData.group === 4
              ? variants.mystery.buttons
              : variants.default.buttons
          }`}
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
          className={`inline-flex justify-center items-center ${
            currentData.group === 4
              ? variants.mystery.buttons
              : variants.default.buttons
          }`}
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
          className={`inline-flex justify-center items-center ${
            currentData.group === 4
              ? variants.mystery.buttons
              : variants.default.buttons
          }`}
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
          className={`inline-flex justify-center items-center ${
            currentData.group === 4
              ? variants.mystery.buttons
              : variants.default.buttons
          }`}
        >
          9
        </button>
        <Link
          href={`/category/${currentData.id}`}
          className={`inline-flex justify-center items-center ${
            currentData.group === 4
              ? variants.mystery.exitBg
              : variants.default.exitBg
          }`}
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
          className={`inline-flex justify-center items-center ${
            currentData.group === 4
              ? variants.mystery.buttons
              : variants.default.buttons
          }`}
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
