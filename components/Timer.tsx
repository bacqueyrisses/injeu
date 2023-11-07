"use client";

import React from "react";
import { useTimer } from "@/providers/TimerProvider";
import { formatMillisecondsToTime } from "@/utils/helpers";

export default function Timer() {
  const { lapse } = useTimer();

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
        <span className={"animate-spin"}>⏱️</span>
      )}
    </div>
  );
}
