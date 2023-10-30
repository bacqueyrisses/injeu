"use client";

import React from "react";
import { useTimer } from "@/providers/TimerProvider";

export default function Timer() {
  const { lapse } = useTimer();

  function formatMillisecondsToTime(milliseconds: number) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  }
  return (
    <div
      className={
        "bg-injeu-blue grow w-full inline-flex justify-center items-center text-3xl text-white"
      }
    >
      {lapse !== 0 ? (
        <>
          <span className={"tracking-wider w-40"}>
            {formatMillisecondsToTime(lapse)}
          </span>
        </>
      ) : (
        <span className={"animate-ping"}>⏱️</span>
      )}
    </div>
  );
}
