import useSound from "use-sound";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ICodesData } from "@/data/codes-data";
import { CongratulationDataCongratsType } from "@/data/congratulation-data";

interface AudioDataI {
  currentData: ICodesData | CongratulationDataCongratsType;
  audioPlaying?: boolean;
  setAudioPlaying?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}
export default function AudioPlayer({
  currentData,
  audioPlaying,
  setAudioPlaying,
  className,
}: AudioDataI) {
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [play, { pause, stop }] = useSound(currentData.audio, {
    onload: () => {
      setAudioLoaded(true);
    },
    onend: () => {
      setAudioEnded(true);
      setAudioStarted(false);
      setAudioPlaying && setAudioPlaying(false);
    },
  });

  useEffect(() => {
    !audioPlaying && stop();
  }, [audioPlaying]);

  console.log(audioLoaded);

  const handleAudio = () => {
    setAudioStarted((prev) => !prev);
    if (audioStarted) {
      pause();
      toast.success("Piste audio en pause");
    } else {
      setAudioPlaying && setAudioPlaying(true);
      play();
      toast.success("Piste audio lancée !");
    }
  };

  return (
    <button
      className={`flex justify-center items-center w-full ${
        "secret" in currentData && currentData.secret ? "h-3/6" : "h-4/6"
      } ${currentData.color} ${className}`}
      onClick={handleAudio}
      disabled={!audioLoaded}
    >
      <Toaster />
      {audioStarted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={!audioLoaded ? "gray" : currentData.fill ? "black" : "white"}
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
          fill={currentData.fill ? "black" : "white"}
          width={300}
          height={300}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      )}
    </button>
  );
}
