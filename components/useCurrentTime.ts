"use client";

import { useSyncExternalStore } from "react";

let currentTime = 0;
const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function startTimer() {
  if (typeof window === "undefined") return;
  if (currentTime === 0) {
    currentTime = Date.now();
  }
  if (intervalId === null) {
    intervalId = setInterval(() => {
      currentTime = Date.now();
      listeners.forEach((listener) => listener());
    }, 10_000);
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  startTimer();
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

const getSnapshot = () => {
  if (currentTime === 0 && typeof window !== "undefined") {
    currentTime = Date.now();
  }
  return currentTime;
};

const getServerSnapshot = () => 0;

export function useCurrentTime(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
