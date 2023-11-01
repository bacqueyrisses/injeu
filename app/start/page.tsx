"use client";
import { ChangeEvent, useEffect, useState } from "react";
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

  const [teamSelected, setTeamSelected] = useState(false);
  const [teamName, setTeamName] = useState("");

  // TODO State machine firstAudioState enum started/playing/ended
  const [firstAudioStarted, setFirstAudioStarted] = useState(false);
  const [secondAudioStarted, setSecondAudioStarted] = useState(false);
  const [firstAudioEnded, setFirstAudioEnded] = useState(false);
  const [secondAudioEnded, setSecondAudioEnded] = useState(false);

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

  useEffect(() => {
    if (play === "true") {
      setTeamSelected(true);
      setFirstAudioEnded(true);
      setSecondAudioEnded(true);
    }
  }, []);

  function teamSection() {
    const handleTeamNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
      setTeamName(e.target.value);
    };
    const handleTeamInit = async () => {
      const schema = z.coerce.string().min(1).trim().toLowerCase();
      try {
        schema.parse(teamName);
        setTeamSelected(true);
        resetTimer();
        localStorage.clear();
        await signIn("credentials", {
          name: teamName,
          redirect: false,
        });
        toast.success(`Bienvenue ${teamName} !`);
      } catch (error) {
        return toast.error("Rentrez un nom d'équipe.");
      }
    };

    return (
      <section
        className={
          "flex w-full h-full flex-col items-center justify-center text-center gap-16 bg-primary"
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
        <Toaster position="bottom-center" />
        {!firstAudioEnded ? (
          <WelcomeSection
            handleFirstAudio={handleFirstAudio}
            firstAudioStarted={firstAudioStarted}
          />
        ) : !secondAudioEnded ? (
          <PrequelSection
            secondAudioStarted={secondAudioStarted}
            handleSecondAudio={handleSecondAudio}
            setFirstAudioEnded={setFirstAudioEnded}
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
