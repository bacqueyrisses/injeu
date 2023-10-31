"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const TimerContext = createContext<null | {
  lapse: number;
  running: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}>(null);

interface ITimerProvider {
  children: ReactNode;
}

export const TimerProvider = ({ children }: ITimerProvider) => {
  function useLocalStorage<T>(
    key: string,
    initialValue: T,
    parseValue = (v: string) => initialValue,
  ): [T, (newValue: T) => void] {
    const [item, setValue] = useState<T>(initialValue);

    useEffect(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(parseValue(storedValue));
      } else {
        localStorage.setItem(key, String(initialValue));
      }
    }, [key, initialValue, parseValue]);

    const setItem = (newValue: T) => {
      setValue(newValue);
      localStorage.setItem(key, String(newValue));
    };

    return [item, setItem];
  }

  const [lapse, setLapse] = useLocalStorage<number>("timer:time", 0, (v) =>
    Number(v),
  );
  const [running, setRunning] = useLocalStorage<boolean>(
    "timer:running",
    false,
    (string) => string === "true",
  );
  const timerRef = useRef<number | NodeJS.Timeout | undefined>();

  useEffect(() => {
    const startTime = Date.now() - lapse;
    timerRef.current = setInterval(() => {
      if (running) {
        setLapse(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running, lapse, setLapse]);

  const pauseTimer = () => {
    setRunning(false);
  };

  const startTimer = () => {
    setRunning(true);
  };

  const resetTimer = () => {
    setLapse(0);
    setRunning(false);
    clearInterval(timerRef.current);
  };

  return (
    <TimerContext.Provider
      value={{ lapse, running, startTimer, pauseTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider.");
  }
  return context;
};
