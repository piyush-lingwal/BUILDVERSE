"use client";

import { useState } from "react";
import { BUILDVERSE as C } from "@/config/buildverse";

type Errors = Record<string, string>;
interface MemberDraft { name: string; email: string; rollNumber: string }

const input = "mt-1 w-full rounded-lg border border-violet-200 bg-white px-3 py-2.5 text-violet-950 placeholder:text-violet-950/40 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-300";
const label = "block text-sm font-medium text-violet-950";

function Field({ id, text, error, children }: { id: string; text: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export function RegisterForm() {
  const [teamName, setTeamName] = useState("");
  const [leader, setLeader] = useState({ name: "", email: "", rollNumber: "", phone: "", course: "", year: "" });
  const [members, setMembers] = useState<MemberDraft[]>([]);
  const [paymentRef, setPaymentRef] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const maxTeammates = C.teamSize.max - 1;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setErrors({}); setFormError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, leader, members, paymentRef, consent, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201) { setDone(true); return; }
      setErrors(data.fieldErrors ?? {});
      setFormError(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-violet-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-violet-950">You&apos;re registered! 🎉</h2>
        <p className="mt-3 text-violet-950/80">Team <b>{teamName}</b> is in. Your payment will be verified by the organisers. Watch the WhatsApp community and your email for the Day 1 timing and the Google Meet link.</p>
      </div>
    );
  }

  const setL = (k: keyof typeof leader) => (e: React.ChangeEvent<HTMLInputElement>) => setLeader({ ...leader, [k]: e.target.value });
  const setM = (i: number, k: keyof MemberDraft) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setMembers(members.map((m, j) => (j === i ? { ...m, [k]: e.target.value } : m)));

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      {formError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{formError}</p>}

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-violet-950">Team</legend>
        <Field id="teamName" text="Team name (solo? use your own name)" error={errors.teamName}>
          <input id="teamName" className={input} value={teamName} onChange={(e) => setTeamName(e.target.value)} maxLength={60} autoComplete="off" required aria-invalid={!!errors.teamName} />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-violet-950">Team leader (you)</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="l-name" text="Full name" error={errors["leader.name"]}><input id="l-name" className={input} value={leader.name} onChange={setL("name")} autoComplete="name" required /></Field>
          <Field id="l-email" text="Email" error={errors["leader.email"]}><input id="l-email" type="email" className={input} value={leader.email} onChange={setL("email")} autoComplete="email" required /></Field>
          <Field id="l-phone" text="Mobile number" error={errors["leader.phone"]}><input id="l-phone" type="tel" inputMode="numeric" className={input} value={leader.phone} onChange={setL("phone")} placeholder="10-digit number" autoComplete="tel" required /></Field>
          <Field id="l-roll" text="Roll number" error={errors["leader.rollNumber"]}><input id="l-roll" className={input} value={leader.rollNumber} onChange={setL("rollNumber")} required /></Field>
          <Field id="l-course" text="Course" error={errors["leader.course"]}><input id="l-course" className={input} value={leader.course} onChange={setL("course")} placeholder="e.g. B.Tech CSE" required /></Field>
          <Field id="l-year" text="Year" error={errors["leader.year"]}><input id="l-year" className={input} value={leader.year} onChange={setL("year")} placeholder="e.g. 3rd" required /></Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-violet-950">Teammates (optional, up to {maxTeammates})</legend>
        {errors.members && <p role="alert" className="text-sm text-red-700">{errors.members}</p>}
        {members.map((m, i) => (
          <div key={i} className="rounded-xl border border-violet-100 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-violet-950">Teammate {i + 1}</p>
              <button type="button" onClick={() => setMembers(members.filter((_, j) => j !== i))} className="text-sm font-medium text-red-700 underline">Remove</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id={`m${i}-name`} text="Full name" error={errors[`members.${i}.name`]}><input id={`m${i}-name`} className={input} value={m.name} onChange={setM(i, "name")} required /></Field>
              <Field id={`m${i}-email`} text="Email" error={errors[`members.${i}.email`]}><input id={`m${i}-email`} type="email" className={input} value={m.email} onChange={setM(i, "email")} required /></Field>
              <Field id={`m${i}-roll`} text="Roll number" error={errors[`members.${i}.rollNumber`]}><input id={`m${i}-roll`} className={input} value={m.rollNumber} onChange={setM(i, "rollNumber")} required /></Field>
            </div>
          </div>
        ))}
        {members.length < maxTeammates && (
          <button type="button" onClick={() => setMembers([...members, { name: "", email: "", rollNumber: "" }])} className="rounded-lg border border-dashed border-violet-400 px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-50">
            + Add a teammate
          </button>
        )}
      </fieldset>

      {C.payment.collectReference && (
        <fieldset className="space-y-3">
          <legend className="text-lg font-bold text-violet-950">Payment (₹{C.feeInr} per team)</legend>
          <p className="text-sm text-violet-950/80">{C.payment.instructions}</p>
          <Field id="pay" text="Transaction (UTR) ID" error={errors.paymentRef}>
            <input id="pay" className={input} value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} maxLength={40} autoComplete="off" required />
          </Field>
        </fieldset>
      )}

      {/* Honeypot: hidden from people and screen readers; bots fill it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-violet-950/90">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-violet-600" />
          <span>I have read the rules. Our solution will be original, and every teammate has agreed to take part.</span>
        </label>
        {errors.consent && <p role="alert" className="mt-1 text-sm text-red-700">{errors.consent}</p>}
      </div>

      <button type="submit" disabled={busy} className="w-full rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {busy ? "Registering…" : "Register team"}
      </button>
    </form>
  );
}
