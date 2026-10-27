"use client";

import { useSyncExternalStore } from "react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { registrationState } from "@/lib/state";

// Open/closed is decided in the visitor's browser, so the page itself can be built once and cached by the CDN.
// The server (and the first hydration pass) assume "open"; the real answer replaces it right after hydration
// and flips again, by itself, the moment the deadline passes.
const DEADLINE = Date.parse(C.registrationDeadline);

function subscribe(onChange: () => void) {
  const msLeft = DEADLINE - Date.now();
  const timer = msLeft > 0 && msLeft < 2 ** 31 - 1 ? setTimeout(onChange, msLeft + 50) : undefined;
  const poll = setInterval(onChange, 60_000); // covers long sleeps / background tabs
  return () => { clearTimeout(timer); clearInterval(poll); };
}

const getSnapshot = () => registrationState(Date.now(), C.registrationDeadline) === "open";
const getServerSnapshot = () => true;

export function useRegistrationOpen(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
