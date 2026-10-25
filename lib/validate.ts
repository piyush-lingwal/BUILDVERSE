// ============================================================
// Registration validation — PURE (no framework, no database)
// ============================================================
// The browser form is a convenience; THIS is the real gate. Everything the
// client sends is untrusted: sizes are bounded, strings are trimmed and
// length-limited, emails are lowercased and de-duplicated.
// ============================================================

import { registrationState } from "./state.ts";
import type { BuildVerseConfig } from "../config/buildverse.ts";

export interface Member { name: string; email: string; rollNumber: string }
export interface Leader extends Member { phone: string; course: string; year: string }

export interface Registration {
  teamName: string;
  leader: Leader;
  /** Teammates, NOT including the leader. */
  members: Member[];
  paymentRef: string | null;
}

export type ValidationResult =
  | { ok: true; value: Registration }
  | { ok: false; status: 400 | 403; error: string; fieldErrors: Record<string, string> };

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const PAYMENT_RE = /^[A-Za-z0-9]{6,30}$/;

const str = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "");

export function normalizePhone(raw: unknown): string | null {
  const digits = (typeof raw === "string" ? raw : "").replace(/\D/g, "");
  if (digits.length === 10 && /^[6-9]/.test(digits)) return `+91 ${digits}`;
  if (digits.length === 12 && digits.startsWith("91") && /^[6-9]/.test(digits.slice(2))) return `+91 ${digits.slice(2)}`;
  return null;
}

export function validateRegistration(body: unknown, now: number, config: BuildVerseConfig): ValidationResult {
  if (registrationState(now, config.registrationDeadline) === "closed") {
    return { ok: false, status: 403, error: "Registrations are closed.", fieldErrors: {} };
  }
  const b = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  // Honeypot: real people never fill this hidden field.
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return { ok: false, status: 400, error: "Invalid request.", fieldErrors: {} };
  }

  const teamName = str(b.teamName, 60);
  if (teamName.length < 2) errors.teamName = "Enter a team name (at least 2 characters). Solo? Use your own name.";

  const l = (typeof b.leader === "object" && b.leader !== null ? b.leader : {}) as Record<string, unknown>;
  const leader: Leader = {
    name: str(l.name, 80),
    email: str(l.email, 320).toLowerCase(),
    rollNumber: str(l.rollNumber, 30),
    phone: "",
    course: str(l.course, 60),
    year: str(l.year, 20),
  };
  if (leader.name.length < 2) errors["leader.name"] = "Enter your full name.";
  if (!EMAIL_RE.test(leader.email)) errors["leader.email"] = "Enter a valid email address.";
  if (leader.rollNumber.length < 3) errors["leader.rollNumber"] = "Enter your roll number.";
  const phone = normalizePhone(l.phone);
  if (!phone) errors["leader.phone"] = "Enter a valid 10-digit mobile number.";
  else leader.phone = phone;
  if (!leader.course) errors["leader.course"] = "Enter your course.";
  if (!leader.year) errors["leader.year"] = "Enter your year.";

  const rawMembers = Array.isArray(b.members) ? b.members : [];
  const maxTeammates = config.teamSize.max - 1;
  if (rawMembers.length > maxTeammates) {
    errors.members = `A team can have at most ${config.teamSize.max} people including you.`;
  }
  const members: Member[] = rawMembers.slice(0, maxTeammates).map((m, i) => {
    const r = (typeof m === "object" && m !== null ? m : {}) as Record<string, unknown>;
    const member: Member = { name: str(r.name, 80), email: str(r.email, 320).toLowerCase(), rollNumber: str(r.rollNumber, 30) };
    if (member.name.length < 2) errors[`members.${i}.name`] = "Enter the teammate's full name.";
    if (!EMAIL_RE.test(member.email)) errors[`members.${i}.email`] = "Enter a valid email address.";
    if (member.rollNumber.length < 3) errors[`members.${i}.rollNumber`] = "Enter the teammate's roll number.";
    return member;
  });

  // Nobody may appear twice (by email or roll number), including the leader.
  const seenEmail = new Set<string>([leader.email]);
  const seenRoll = new Set<string>([leader.rollNumber.toLowerCase()]);
  members.forEach((m, i) => {
    if (m.email && seenEmail.has(m.email)) errors[`members.${i}.email`] ??= "This email is already used in your team.";
    if (m.rollNumber && seenRoll.has(m.rollNumber.toLowerCase())) errors[`members.${i}.rollNumber`] ??= "This roll number is already used in your team.";
    seenEmail.add(m.email);
    seenRoll.add(m.rollNumber.toLowerCase());
  });

  let paymentRef: string | null = null;
  if (config.payment.collectReference) {
    const ref = str(b.paymentRef, 40).replace(/\s/g, "");
    if (!PAYMENT_RE.test(ref)) errors.paymentRef = "Enter the transaction (UTR) ID, 6–30 letters or digits.";
    else paymentRef = ref.toUpperCase();
  }

  if (b.consent !== true) errors.consent = "Please confirm the rules to register.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, status: 400, error: "Please fix the highlighted fields.", fieldErrors: errors };
  }
  return { ok: true, value: { teamName, leader, members, paymentRef } };
}
