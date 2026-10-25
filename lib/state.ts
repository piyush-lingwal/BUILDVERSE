// ============================================================
// Registration state + countdown — PURE
// ============================================================

export type RegistrationState = "open" | "closed";

export function registrationState(now: number, deadlineIso: string): RegistrationState {
  const deadline = Date.parse(deadlineIso);
  if (Number.isNaN(deadline)) return "closed"; // a broken config must never leave registration open
  return now < deadline ? "open" : "closed";
}

export interface CountdownParts { days: number; hours: number; minutes: number; seconds: number }

export function countdownParts(now: number, deadlineIso: string): CountdownParts {
  const deadline = Date.parse(deadlineIso);
  const ms = Number.isNaN(deadline) ? 0 : Math.max(0, deadline - now);
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
