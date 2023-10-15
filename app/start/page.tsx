"use client";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import PlaySection from "@/components/start/PlaySection";
import PrequelSection from "@/components/start/PrequelSection";
import WelcomeSection from "@/components/start/WelcomeSection";
import { useSearchParams } from "next/navigation";

export default function StartPage() {
  const searchParams = useSearchParams();
  const play = searchParams.get("play");
  console.log(play);

  const [teamSelected, setTeamSelected] = useState(false);

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
    const handleTeamInit = () => {
      setTeamSelected(true);
    };

    return (
      <section
        className={
          "flex w-full h-full flex-col items-center justify-center text-center gap-16 bg-primary"
        }
      >
        <span className={"text-5xl px-20 leading-tight"}>NOM DE L'ÉQUIPE</span>
        <input type={"text"} className={"bg-stone-400 p-4 rounded-xl"} />
        <button
          onClick={handleTeamInit}
          className={"px-4 py-2 bg-yellow-300 rounded-xl text-2xl"}
        >
          commencer
        </button>
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
