"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  function useLocalStorage(key, initialValue, parseValue = (v) => v) {
    const [item, setValue] = useState(null);

    useEffect(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(parseValue(storedValue));
      } else {
        localStorage.setItem(key, initialValue);
      }
    }, [key, initialValue, parseValue]);

    const setItem = (newValue) => {
      setValue(newValue);
      localStorage.setItem(key, newValue);
    };
    return [item, setItem];
  }
  const [lapse, setLapse] = useLocalStorage("timer:time", 0, (v) => Number(v));

  const [running, setRunning] = useLocalStorage(
    "timer:running",
    false,
    (string) => string === "true",
  );
  const timerRef = useRef();

  useEffect(() => {
    const startTime = Date.now() - lapse;
    const timer = setInterval(() => {
      if (running) {
        setLapse(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);

    timerRef.current = timer;

    return () => clearInterval(timer);
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
