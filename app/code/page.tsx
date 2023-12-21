"use client";
import { useEffect, useState } from "react";
import { CodesData } from "@/data/codes-data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import useSound from "use-sound";

const fetchUnlockedCategories = async ({ group }: { group: number }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/category/selectall/${group}`,
  );

  if (!response.ok) throw new Error("Erreur serveur, réessayez. 4");

  return await response.json();
};
export default function CodePage() {
  const router = useRouter();
  const [playWrong] = useSound("/audios/FAUX.mp4");

  const [firstSectionUnlocked, setFirstSectionUnlocked] = useState(false);

  useEffect(() => {
    fetchUnlockedCategories({ group: 1 }).then((v) => {
      if (v?.length === firstValidCodesWithSecret.length)
        setFirstSectionUnlocked(true);
    });
  }, []);

  const firstValidCodes = CodesData.filter((item) => {
    return item.group === 1;
  }).map((item) => item.id);
  const firstValidCodesWithSecret = CodesData.filter((item) => {
    return item.group === 1 && item.secret;
  }).map((item) => item.id);
  const secondValidCodes = CodesData.filter((item) => {
    return item.group === 2;
  }).map((item) => item.id);
  const validCodes = !firstSectionUnlocked ? firstValidCodes : secondValidCodes;

  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [activeCode, setActiveCode] = useState(1);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleNumberClick = (number: string) => {
    if (code2 && activeCode === 2) return;
    if (activeCode === 1) {
      setCode1(number);
      setActiveCode(2);
    } else {
      setCode2(number);
      validateCode(Number(code1 + number));
    }
  };

  const validateCode = (completeCode: number) => {
    if (validCodes.includes(completeCode)) {
      setCorrect(true);
      void router.push(`/category/${completeCode}`);
    } else {
      playWrong();
      setError(true);

      firstValidCodes.includes(completeCode)
        ? toast.error("Code déjà validé, réessayez ! !")
        : toast.error("Mauvais code, réessayez !");

      setTimeout(() => {
        setError(false);
        setCode1("");
        setCode2("");
        setActiveCode(1);
      }, 1400);
    }
  };

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      <Toaster toastOptions={{ duration: 1400 }} />
      <section
        className={
          "h-1/6 w-full bg-secondary flex items-center justify-center text-6xl"
        }
      >
        <span>OBJET</span>
      </section>
      <section
        className={
          "h-2/6 bg-injeu-light-red w-full flex items-center justify-center gap-4"
        }
      >
        <span
          className={`text-7xl w-1/5 h-2/3 inline-flex justify-center items-center ${
            error
              ? "bg-injeu-red transition-colors"
              : correct
              ? "bg-injeu-pop-green transition-colors"
              : "bg-white"
          }`}
        >
          {code1}
        </span>
        <span
          className={`text-7xl w-1/5 h-2/3 inline-flex justify-center items-center ${
            error
              ? "bg-injeu-red transition-colors"
              : correct
              ? "bg-injeu-pop-green transition-colors"
              : "bg-white"
          }`}
        >
          {code2}
        </span>
      </section>
      <section className={"h-3/6 w-full grid grid-cols-3 grid-rows-4 text-6xl"}>
        <button
          onClick={() => handleNumberClick("1")}
          className={
            "bg-injeu-blue text-white inline-flex justify-center items-center"
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
            "bg-injeu-blue text-white inline-flex justify-center items-center"
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
            "bg-injeu-blue text-white inline-flex justify-center items-center"
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
            "bg-injeu-blue text-white inline-flex justify-center items-center"
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
            "bg-injeu-blue text-white inline-flex justify-center items-center"
          }
        >
          9
        </button>
        <Link
          href={{
            pathname: "/start",
            query: {
              play: "true",
            },
          }}
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
            "bg-injeu-blue text-white inline-flex justify-center items-center"
          }
        >
          0
        </button>
        <span
          className={
            "inline-flex justify-center items-center bg-injeu-light-red"
          }
        ></span>
      </section>
    </main>
  );
}
