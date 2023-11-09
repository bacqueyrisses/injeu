"use client";
import { ChangeEvent, useState } from "react";
import useSound from "use-sound";
import PlaySection from "@/components/start/PlaySection";
import PrequelSection from "@/components/start/PrequelSection";
import WelcomeSection from "@/components/start/WelcomeSection";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useTimer } from "@/providers/TimerProvider";

export default function StartPage() {
  const searchParams = useSearchParams();
  const play = searchParams.get("play");
  const { resetTimer } = useTimer();

  const [teamSelected, setTeamSelected] = useState(() => {
    return play === "true";
  });
  const [teamName, setTeamName] = useState("");

  const [firstAudioStarted, setFirstAudioStarted] = useState(false);
  const [secondAudioStarted, setSecondAudioStarted] = useState(false);
  const [firstAudioEnded, setFirstAudioEnded] = useState(() => {
    return play === "true";
  });
  const [secondAudioEnded, setSecondAudioEnded] = useState(() => {
    return play === "true";
  });
  const [firstAudioLoaded, setFirstAudioLoaded] = useState(false);
  const [secondAudioLoaded, setSecondAudioLoaded] = useState(false);

  const [playFirst, { pause: pauseFirst, stop: stopFirst }] = useSound(
    "/audios/INTRO.mp4",
    {
      onload: () => {
        setFirstAudioLoaded(true);
      },
      onend: () => {
        setFirstAudioEnded(true);
        setFirstAudioStarted(false);
      },
    },
  );
  const [playSecond, { pause: pauseSecond, stop: stopSecond }] = useSound(
    "/audios/REGLES.mp3",
    {
      onload: () => {
        setSecondAudioLoaded(true);
      },
      onend: () => {
        setSecondAudioEnded(true);
        setSecondAudioStarted(false);
      },
    },
  );

  function teamSection() {
    const handleTeamNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
      setTeamName(e.target.value);
    };
    const handleTeamInit = async () => {
      const schema = z.coerce
        .string()
        .min(1)
        .trim()
        .toLowerCase()
        .transform((value) => value.replaceAll(" ", ""));

      try {
        const newTeamName = schema.parse(teamName);
        resetTimer();
        localStorage.clear();
        setTeamSelected(true);
        await signIn("credentials", {
          name: newTeamName,
          redirect: false,
        });
        toast.success(`Bienvenue ${newTeamName} !`);
      } catch (error) {
        return toast.error("Rentrez un nom d'équipe.");
      }
    };

    return (
      <section
        className={
          "flex w-full h-full flex-col items-center justify-center text-center gap-16 bg-primary overflow-hidden"
        }
      >
        <span className={"text-5xl px-20 leading-extra-tight"}>
          NOM DE L'ÉQUIPE
        </span>
        <input
          type={"text"}
          value={teamName}
          onChange={(e) => handleTeamNameChange(e)}
          className={
            "bg-stone-400 px-5 py-4 rounded-xl outline-none focus-within:outline-injeu-yellow outline-2 outline-offset-2 text-2xl w-2/3 md:w-1/3 text-center"
          }
        />
        <button
          onClick={handleTeamInit}
          className={"px-4 py-2 bg-injeu-yellow rounded-xl text-3xl"}
        >
          commencer
        </button>
        <Toaster />
      </section>
    );
  }

  function introSection() {
    const handleFirstAudio = () => {
      setFirstAudioStarted((prev) => !prev);
      if (firstAudioStarted) {
        pauseFirst();
        toast.success("Introduction en pause");
      } else {
        playFirst();
        toast.success("Introduction lancée !");
      }
    };
    const handleSecondAudio = () => {
      setSecondAudioStarted((prev) => !prev);
      if (secondAudioStarted) {
        pauseSecond();
        toast.success("Règles en pause");
      } else {
        playSecond();
        toast.success("Règles en écoute !");
      }
    };

    return (
      <section
        className={"flex w-full h-full flex-col items-center justify-between"}
      >
        <Toaster position="bottom-center" />
        {!firstAudioEnded ? (
          <WelcomeSection
            handleFirstAudio={handleFirstAudio}
            stopFirstAudio={stopFirst}
            firstAudioStarted={firstAudioStarted}
            firstAudioLoaded={firstAudioLoaded}
          />
        ) : !secondAudioEnded ? (
          <PrequelSection
            secondAudioStarted={secondAudioStarted}
            handleSecondAudio={handleSecondAudio}
            stopSecondAudio={stopSecond}
            setFirstAudioEnded={setFirstAudioEnded}
            secondAudioLoaded={secondAudioLoaded}
          />
        ) : (
          <PlaySection setSecondAudioEnded={setSecondAudioEnded} />
        )}
      </section>
    );
  }

  return (
    <main
      className={"flex flex-col w-full h-screen items-center justify-between"}
    >
      {teamSelected ? introSection() : teamSection()}
    </main>
  );
}
