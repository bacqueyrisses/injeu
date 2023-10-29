"use client";

import React from "react";
import { useTimer } from "@/providers/TimerProvider";

export default function Timer() {
  const { lapse } = useTimer();

  function formatMillisecondsToTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 second = 1000 milliseconds

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  }
  return (
    <div
      className={
        "bg-injeu-blue h-min grow w-full inline-flex justify-center items-center text-3xl text-white"
      }
    >
      {lapse !== null ? (
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
